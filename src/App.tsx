import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import SearchWidget from './components/SearchWidget';
import SidebarFilters from './components/SidebarFilters';
import FlightCard from './components/FlightCard';
import { mockFlights } from './data';
import { FlightOption } from './types';

export default function App() {
  const [currency, setCurrency] = useState('USD');
  const [isLoading, setIsLoading] = useState(false);
  const [flights, setFlights] = useState<FlightOption[]>(mockFlights);
  const [error, setError] = useState<{ type: string, message: string } | null>(null);
  const [lastSearchParams, setLastSearchParams] = useState<any>(null);
  
  // Filter states
  const [maxStops, setMaxStops] = useState<number | null>(null);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const [searchContext, setSearchContext] = useState({
    origin: 'SFO',
    destination: 'HND',
    dateDesc: 'Flexible Dates',
    passengers: 1,
    cabinClass: 'Economy'
  });

  const handleSearch = async (params: any) => {
    setLastSearchParams(params);
    setIsLoading(true);
    setError(null);
    setSearchContext({
      origin: params.origin,
      destination: params.destination,
      dateDesc: `${params.outboundDate} ${params.tripType !== 'oneway' ? `– ${params.returnDate}` : ''}`,
      passengers: (params.adults || 1) + (params.children || 0) + (params.infantsInSeat || 0) + (params.infantsOnLap || 0),
      cabinClass: params.cabinClass || 'Economy'
    });

    if (params.directOnly) {
      setMaxStops(0);
    } else {
      setMaxStops(null);
    }

    try {
      const url = new URL('/api/flights', window.location.origin);
      url.searchParams.append('origin', params.origin);
      url.searchParams.append('destination', params.destination);
      url.searchParams.append('outboundDate', params.outboundDate);
      url.searchParams.append('tripType', params.tripType);
      url.searchParams.append('currency', currency);
      url.searchParams.append('adults', params.adults?.toString() || '1');
      url.searchParams.append('children', params.children?.toString() || '0');
      url.searchParams.append('infantsInSeat', params.infantsInSeat?.toString() || '0');
      url.searchParams.append('infantsOnLap', params.infantsOnLap?.toString() || '0');
      url.searchParams.append('cabinClass', params.cabinClass || 'economy');
      if (params.tripType !== 'oneway') {
        url.searchParams.append('returnDate', params.returnDate);
      }

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        setError({
          type: data.error || 'ERROR',
          message: data.message || 'Failed to fetch flights'
        });
        setIsLoading(false);
        return;
      }

      // Parse fast-flights-ts flights format
      const allApiFlights = data.results || [];
      
      if (allApiFlights.length === 0) {
        setFlights([]);
        setIsLoading(false);
        return;
      }

      const formatTime = (timeArr: number[]) => {
        if (!timeArr || timeArr.length < 2) return 'TBD';
        const h = timeArr[0];
        const m = timeArr[1];
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        const mStr = m < 10 ? `0${m}` : m.toString();
        return `${h12}:${mStr} ${ampm}`;
      };

      const mappedFlights: FlightOption[] = allApiFlights
        .filter((f: any) => f.price > 0)
        .map((f: any, idx: number) => {
        
        let totalMins = 0;
        const mappedSegments = f.flights.map((s: any, sIdx: number) => {
          totalMins += (s.duration || 0);
          return {
            id: `seg-${idx}-${sIdx}`,
            origin: s.from_airport?.code || params.origin,
            destination: s.to_airport?.code || params.destination,
            departureTime: formatTime(s.departure?.time),
            arrivalTime: formatTime(s.arrival?.time),
            duration: `${Math.floor((s.duration || 0) / 60)}h ${(s.duration || 0) % 60}m`,
            airlineName: f.airlines[sIdx] || f.airlines[0] || 'Airline',
            airlineCode: (f.airlines[sIdx] || f.airlines[0] || 'AA').substring(0,2).toUpperCase(),
            flightNumber: s.flight_number || 'Flight',
            aircraft: s.plane_type || 'Commercial Jet'
          };
        });

        // Add layovers roughly
        if (f.flights.length > 1) {
          totalMins += (f.flights.length - 1) * 90; // approx layover if not calculated exactly
        }

        const firstSeg = mappedSegments[0];
        const lastSeg = mappedSegments[mappedSegments.length - 1];

        return {
          id: `flight-${idx}`,
          price: f.price,
          currency: currency,
          totalDuration: `${Math.floor(totalMins / 60)}h ${totalMins % 60}m`,
          stops: f.flights.length - 1,
          rating: 4.5, // Mocked rating
          fareCode: f.type || 'MAIN',
          seatsLeft: Math.floor(Math.random() * 9) + 1, // simulated
          isCheapest: false,
          isBest: false,
          score: 9.0,
          badges: [],
          priceDifference: undefined,
          bookingLink: `https://www.google.com/travel/flights?q=Flights%20to%20${params.destination}%20from%20${params.origin}%20on%20${params.outboundDate}`,
          baggage: { carryOn: 1, checked: 1 },
          features: { wifi: 'Wi-Fi Available' },
          segments: mappedSegments,
          // Extract overall times from first and last segments for the card
          overallOrigin: firstSeg.origin,
          overallDestination: lastSeg.destination,
          overallDepartureTime: firstSeg.departureTime,
          overallArrivalTime: lastSeg.arrivalTime,
        };
      });

      if (mappedFlights.length > 0) {
        // Sort by price to determine cheapest
        mappedFlights.sort((a, b) => a.price - b.price);
        mappedFlights[0].isCheapest = true;
        mappedFlights[0].isBest = true;
        mappedFlights[0].badges = ['Best Option'];
      }

      setFlights(mappedFlights);
    } catch (err: any) {
      setError({ type: 'NETWORK_ERROR', message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (lastSearchParams) {
      handleSearch(lastSearchParams);
    }
  }, [currency]);

  const filteredFlights = flights.filter(f => {
    if (maxStops !== null && f.stops > maxStops) return false;
    if (maxPrice !== null && f.price > maxPrice) return false;
    if (selectedAirlines.length > 0) {
      const airlineName = f.segments[0].airlineName;
      if (!selectedAirlines.includes(airlineName)) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20 selection:text-primary">
      <Layout currency={currency} setCurrency={setCurrency}>
        <SearchWidget onSearch={handleSearch} isLoading={isLoading} />
        
        <div className="max-w-container-max mx-auto w-full px-gutter-mobile lg:px-gutter-desktop pt-space-md flex flex-col gap-space-lg">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start pb-space-2xl">
            <SidebarFilters 
              flights={flights}
              maxStops={maxStops} setMaxStops={setMaxStops}
              selectedAirlines={selectedAirlines} setSelectedAirlines={setSelectedAirlines}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              currency={currency}
            />
            
            <div className="lg:col-span-9 flex flex-col gap-space-md">
              
              {/* Header info bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest/90 border border-outline-variant/30 p-space-md rounded-2xl shadow-md">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-space-sm">
                    <div className="flex items-center gap-space-xs px-2 py-0.5 rounded-full bg-primary-container/15 text-primary font-label-badge text-label-badge font-bold uppercase tracking-wider">
                      <span className="material-symbols-outlined text-xs">flight_takeoff</span>
                      <span>Route Telemetry</span>
                    </div>
                    <span className="text-outline-variant text-body-sm">•</span>
                    <span className="font-label-data-mono text-label-data-mono text-tertiary font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                      {filteredFlights.length} flights found
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                    {searchContext.origin} to {searchContext.destination}
                  </h2>
                  <div className="flex flex-wrap items-center gap-space-sm text-body-sm text-on-surface-variant">
                    <span className="font-label-data-mono text-label-data-mono text-outline">{searchContext.dateDesc}</span>
                    <span className="text-outline-variant">•</span>
                    <span className="text-outline capitalize">{searchContext.passengers} Passenger{searchContext.passengers > 1 ? 's' : ''}, {searchContext.cabinClass}</span>
                    <span className="text-outline-variant">•</span>
                    <span className="text-tertiary font-semibold">Live Google Flights</span>
                  </div>
                </div>
              </div>
              
              {/* Sorting */}
              <div className="flex flex-wrap items-center justify-between gap-space-sm bg-surface-container/60 p-space-sm rounded-xl">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="font-label-badge text-label-badge uppercase tracking-wider text-outline px-1">Sort By:</span>
                  <button className="px-space-sm py-1 rounded-full font-label-data-mono text-label-data-mono font-bold bg-primary-container text-on-primary-container shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">savings</span>
                    <span>Cheapest</span>
                  </button>
                </div>
              </div>
              
              {/* API Error State */}
              {error && (
                <div className="bg-error-container/20 border border-error/50 p-space-md rounded-xl text-center flex flex-col items-center gap-2 my-4">
                  <span className="material-symbols-outlined text-error text-3xl">warning</span>
                  <h3 className="font-bold text-error">Flight Search Unavailable ({error.type})</h3>
                  <p className="text-on-surface-variant max-w-lg text-sm">{error.message}</p>
                  {error.type === 'SCRAPER_ERROR' && (
                    <p className="text-xs text-outline mt-2 font-mono bg-surface-container-highest p-2 rounded w-full">
                      The free Google Flights scraper may be experiencing rate limits or captcha blocks. Try again later or try a different route.
                    </p>
                  )}
                </div>
              )}
              
              {/* Flight List */}
              {isLoading ? (
                 <div className="flex flex-col items-center justify-center py-24 text-outline gap-4">
                   <span className="material-symbols-outlined text-4xl animate-spin text-primary">autorenew</span>
                   <p className="font-label-data-mono">Querying real-time global feeds...</p>
                 </div>
              ) : !error && filteredFlights.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-24 text-outline gap-4">
                   <span className="material-symbols-outlined text-4xl text-outline-variant">flight_off</span>
                   <p className="font-label-data-mono">No flights found matching your criteria.</p>
                 </div>
              ) : !error && (
                <div className="flex flex-col gap-space-sm">
                  {filteredFlights.map(flight => (
                    <FlightCard key={flight.id} flight={flight} />
                  ))}
                </div>
              )}
              
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
