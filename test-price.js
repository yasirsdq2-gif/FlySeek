const { createQuery, getFlights } = require("fast-flights-ts");
async function run() {
  const q = createQuery({
    flights: [{ from_airport: "JFK", to_airport: "LHR", date: "2026-10-15" }],
    currency: "PKR"
  });
  const res = await getFlights(q);
  console.log(JSON.stringify(res.slice(0,2), null, 2));
}
run();
