import { createQuery, Passengers, getFlights } from 'fast-flights-ts';

async function test() {
  try {
    const query = createQuery({
      flights: [
        { date: '2026-10-15', from_airport: 'SFO', to_airport: 'HND' }
      ],
      seat: 'economy',
      trip: 'one-way',
      passengers: new Passengers({ adults: 1 }),
      currency: 'USD',
    });
    const flights = await getFlights(query);
    console.log(JSON.stringify(flights.slice(0, 1), null, 2));
  } catch (e) {
    console.error(e);
  }
}
test();
