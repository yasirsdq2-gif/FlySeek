import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { createQuery, Passengers, getFlights, FlightError } from "fast-flights-ts";
import airportData from "airport-data-js";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Airport Autocomplete API
  app.get("/api/airports", async (req, res) => {
    try {
      const q = req.query.q as string;
      if (!q) {
        return res.json([]);
      }
      const suggestions = await airportData.getAutocompleteSuggestions(q);
      
      const mapped = suggestions.map(apt => {
        // compute a clean city/display name
        let cleanName = apt.airport.replace(/\s*(International|Regional|Municipal|City|County)?\s*(Airport|Airfield|Heliport).*/i, '').trim();
        return {
          ...apt,
          city: cleanName
        };
      });
      
      res.json(mapped);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "INTERNAL_ERROR", message: "Failed to fetch airports" });
    }
  });

  // API Routes
  app.get("/api/flights", async (req, res) => {
    const { origin, destination, outboundDate, returnDate, tripType, currency, adults, children, infantsInSeat, infantsOnLap, cabinClass } = req.query;
    
    if (!origin || !destination || !outboundDate) {
      return res.status(400).json({ error: 'INVALID_PARAMS', message: 'Missing required parameters.' });
    }

    try {
      const type = tripType === 'oneway' ? 'one-way' : 'round-trip';
      
      const flightsQuery = [];
      flightsQuery.push({ date: outboundDate as string, from_airport: origin as string, to_airport: destination as string });
      
      if (type === 'round-trip' && returnDate) {
        flightsQuery.push({ date: returnDate as string, from_airport: destination as string, to_airport: origin as string });
      }

      console.log(`Fetching from Google Flights via fast-flights-ts...`);
      
      const query = createQuery({
        flights: flightsQuery,
        seat: (cabinClass as any) || "economy",
        trip: type,
        passengers: new Passengers({ 
          adults: Number(adults) || 1,
          children: Number(children) || 0,
          infants_in_seat: Number(infantsInSeat) || 0,
          infants_on_lap: Number(infantsOnLap) || 0
        }),
        currency: (currency as string) || "USD",
      });

      const results = await getFlights(query, { timeout: 15000, maxRetries: 1 });
      
      res.json({ results });
    } catch (err: any) {
      console.error("Flight Error:", err);
      let errorType = 'INTERNAL_ERROR';
      if (err instanceof FlightError) {
        errorType = 'SCRAPER_ERROR';
      }
      res.status(500).json({ error: errorType, message: err.message || 'Failed to fetch flights.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
