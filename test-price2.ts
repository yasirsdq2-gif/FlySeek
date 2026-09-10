import { createQuery, getFlights } from "fast-flights-ts";
async function run() {
  const q = createQuery({
    flights: [{ from_airport: "MUX", to_airport: "RUH", date: "2026-10-16" }],
    currency: "PKR"
  });
  const res = await getFlights(q);
  console.log(JSON.stringify(res.slice(0,3), null, 2));
}
run();
