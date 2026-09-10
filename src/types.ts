export interface FlightSegment {
  id: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  airlineName: string;
  airlineCode: string;
  airlineLogo?: string;
  flightNumber: string;
  aircraft: string;
}

export interface FlightOption {
  id: string;
  price: number;
  currency: string;
  totalDuration: string;
  stops: number;
  segments: FlightSegment[];
  isCheapest?: boolean;
  isBest?: boolean;
  isFastest?: boolean;
  score: number;
  baggage: {
    carryOn: number;
    checked: number;
  };
  features: {
    wifi?: string;
    dining?: string;
    entertainment?: string;
  };
  fareCode: string;
  seatsLeft: number;
  carbonEmissions?: number;
  rating: number;
  operatedBy?: string;
  badges?: string[];
  priceDifference?: {
    amount: number;
    text: string;
  };
  bookingLink?: string;
  overallOrigin?: string;
  overallDestination?: string;
  overallDepartureTime?: string;
  overallArrivalTime?: string;
}

export interface FareTrackerDay {
  date: string;
  price: number;
  isOptimal?: boolean;
  isPeak?: boolean;
  difference?: number;
}
