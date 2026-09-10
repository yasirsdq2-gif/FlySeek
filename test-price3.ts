import { createQuery, getFlights } from "fast-flights-ts";
async function run() {
  const q = createQuery({
    flights: [
      { from_airport: "MUX", to_airport: "RUH", date: "2026-10-16" },
      { from_airport: "RUH", to_airport: "MUX", date: "2026-10-23" }
    ],
    currency: "PKR",
    trip: "round-trip"
  });
  const res = await getFlights(q);
  console.log(JSON.stringify(res.slice(0,1), null, 2));
}
run();
