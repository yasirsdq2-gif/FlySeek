import { FlightOption, FareTrackerDay } from './types';

export const fareTrackerData: FareTrackerDay[] = [
  { date: 'Tue, Oct 14', price: 912, difference: 164 },
  { date: 'Wed, Oct 15', price: 830, difference: 82 },
  { date: 'Thu, Oct 16', price: 748, isOptimal: true },
  { date: 'Fri, Oct 17', price: 815, difference: 67 },
  { date: 'Sat, Oct 18', price: 1040, difference: 292, isPeak: true },
  { date: 'Sun, Oct 19', price: 980, difference: 232, isPeak: true },
  { date: 'Mon, Oct 20', price: 860, difference: 112 },
];

export const mockFlights: FlightOption[] = [
  {
    id: 'f1',
    price: 695,
    currency: 'USD',
    totalDuration: '14h 45m',
    stops: 1,
    rating: 4.95,
    fareCode: 'K-DISCOUNT',
    seatsLeft: 4,
    isCheapest: true,
    score: 9.2,
    badges: ['Lowest Fare Arbitrage'],
    priceDifference: {
      amount: -225,
      text: '-$225 vs Google Flights',
    },
    baggage: { carryOn: 1, checked: 2 },
    features: {
      wifi: 'Free Unlimited Wi-Fi',
      dining: 'KrisWorld Dining',
    },
    segments: [
      {
        id: 's1',
        origin: 'SFO',
        destination: 'SIN',
        departureTime: '10:15 AM',
        arrivalTime: '5:00 PM',
        duration: '14h 45m',
        airlineName: 'Singapore Airlines',
        airlineCode: 'SQ',
        flightNumber: 'SQ 031 / SQ 638',
        aircraft: 'Airbus A350-900',
      }
    ]
  },
  {
    id: 'f2',
    price: 748,
    currency: 'USD',
    totalDuration: '11h 15m',
    stops: 0,
    rating: 4.8,
    fareCode: 'K-DISCOUNT',
    seatsLeft: 3,
    isBest: true,
    score: 9.6,
    badges: ['Best Nonstop Option'],
    operatedBy: 'Operated directly by ANA',
    priceDifference: {
      amount: -182,
      text: '-$182 vs Google Flights',
    },
    baggage: { carryOn: 1, checked: 2 },
    features: {
      wifi: 'High-Speed Wi-Fi',
      dining: '34" Legroom',
    },
    segments: [
      {
        id: 's2',
        origin: 'SFO',
        destination: 'HND',
        departureTime: '11:30 AM',
        arrivalTime: '3:45 PM',
        duration: '11h 15m',
        airlineName: 'All Nippon Airways',
        airlineCode: 'NH',
        flightNumber: 'NH 107',
        aircraft: 'Boeing 787-9 Dreamliner',
      }
    ]
  },
  {
    id: 'f3',
    price: 782,
    currency: 'USD',
    totalDuration: '11h 10m',
    stops: 0,
    rating: 4.9,
    fareCode: 'V-PROMO',
    seatsLeft: 5,
    isFastest: true,
    score: 9.5,
    badges: ['Skytrax 5-Star'],
    operatedBy: 'Flagship Tokyo service',
    priceDifference: {
      amount: -135,
      text: '-$135 vs Google Flights',
    },
    baggage: { carryOn: 1, checked: 2 },
    features: {
      wifi: 'Wi-Fi Included',
      dining: 'Japanese Gourmet Dining',
    },
    segments: [
      {
        id: 's3',
        origin: 'SFO',
        destination: 'HND',
        departureTime: '1:45 PM',
        arrivalTime: '5:55 PM',
        duration: '11h 10m',
        airlineName: 'Japan Airlines',
        airlineCode: 'JL',
        flightNumber: 'JL 001',
        aircraft: 'Airbus A350-1000',
      }
    ]
  },
  {
    id: 'f4',
    price: 815,
    currency: 'USD',
    totalDuration: '11h 25m',
    stops: 0,
    rating: 4.4,
    fareCode: 'L-STANDARD',
    seatsLeft: 8,
    score: 8.5,
    badges: ['Star Alliance'],
    operatedBy: 'SFO Premier Departure Hub',
    priceDifference: {
      amount: -90,
      text: '-$90 vs Google Flights',
    },
    baggage: { carryOn: 1, checked: 0 },
    features: {
      wifi: 'United Wi-Fi',
      entertainment: 'Seatback Entertainment',
    },
    segments: [
      {
        id: 's4',
        origin: 'SFO',
        destination: 'HND',
        departureTime: '10:45 AM',
        arrivalTime: '2:10 PM',
        duration: '11h 25m',
        airlineName: 'United Airlines',
        airlineCode: 'UA',
        flightNumber: 'UA 875',
        aircraft: 'Boeing 777-200ER',
      }
    ]
  },
  {
    id: 'f5',
    price: 849,
    currency: 'USD',
    totalDuration: '11h 35m',
    stops: 0,
    rating: 4.7,
    fareCode: 'T-MAIN',
    seatsLeft: 6,
    score: 8.8,
    badges: ['SkyTeam Direct'],
    operatedBy: 'Direct service • Delta One upgrades',
    baggage: { carryOn: 1, checked: 0 },
    features: {
      wifi: 'Free Fast Wi-Fi',
      entertainment: 'Delta Studio Screens',
    },
    segments: [
      {
        id: 's5',
        origin: 'SFO',
        destination: 'HND',
        departureTime: '12:05 PM',
        arrivalTime: '4:40 PM',
        duration: '11h 35m',
        airlineName: 'Delta Air Lines',
        airlineCode: 'DL',
        flightNumber: 'DL 167',
        aircraft: 'Airbus A330-900neo',
      }
    ]
  }
];
