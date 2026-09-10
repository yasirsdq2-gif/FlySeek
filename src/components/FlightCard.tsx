import React from 'react';
import { FlightOption } from '../types';

interface FlightCardProps {
  flight: FlightOption;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const segment = flight.segments[0];
  
  const getCardStyle = () => {
    if (flight.isCheapest || flight.isBest) {
      return "bg-surface-container-low/95 border border-tertiary/40 hover:border-tertiary shadow-[0_4px_24px_rgba(0,0,0,0.35)]";
    }
    return "bg-surface-container-low/95 border border-outline-variant/30 hover:border-primary/40 shadow-[0_4px_24px_rgba(0,0,0,0.25)]";
  };
  
  const getButtonColor = () => {
    if (flight.isCheapest) return "from-tertiary to-primary-container text-on-primary shadow-[0_0_20px_rgba(86,229,169,0.3)] hover:shadow-[0_0_30px_rgba(86,229,169,0.5)]";
    if (flight.isBest) return "from-primary-container to-primary text-on-primary shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]";
    return "bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface";
  };

  const getAirlineColor = () => {
    if (segment.airlineCode === 'SQ') return "text-tertiary";
    if (segment.airlineCode === 'JL' || segment.airlineCode === 'DL') return "text-error";
    return "text-primary";
  };

  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: flight.currency, maximumFractionDigits: 0 }).format(flight.price);

  return (
    <div className={`rounded-2xl p-space-md transition-all flex flex-col gap-space-md group ${getCardStyle()}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        
        {/* Airline Info */}
        <div className="flex items-center gap-space-md">
          <div className="w-14 h-14 rounded-xl bg-surface-container-high flex flex-col items-center justify-center border border-outline-variant/30 text-center shadow-inner">
            <span className={`font-label-numeric-code text-label-numeric-code font-extrabold ${getAirlineColor()}`}>
              {segment.airlineCode}
            </span>
            <span className="font-label-badge text-[9px] uppercase tracking-wider text-outline">{segment.airlineName.split(' ')[0]}</span>
          </div>
          
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-space-xs">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">{segment.airlineName}</h3>
              {flight.badges?.map((badge, i) => (
                <span key={i} className={`px-2 py-0.5 rounded font-label-badge text-label-badge font-bold uppercase tracking-wider ${flight.isCheapest ? 'bg-tertiary/20 text-tertiary' : flight.isBest ? 'bg-tertiary/20 text-tertiary' : segment.airlineCode === 'JL' ? 'bg-surface-container-high text-primary' : segment.airlineCode === 'UA' ? 'bg-surface-container-high text-secondary' : 'bg-surface-container-high text-primary'}`}>
                  {badge}
                </span>
              ))}
              <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-outline font-label-badge text-label-badge font-mono font-medium">
                {segment.aircraft}
              </span>
            </div>
            
            <div className="text-body-sm text-outline flex flex-wrap items-center gap-1 mt-0.5">
              <span>{segment.flightNumber}</span>
              <span>•</span>
              <span className="text-tertiary flex items-center gap-0.5"><span className="material-symbols-outlined text-xs">star</span>{flight.rating} Rating</span>
              {flight.operatedBy && (
                <>
                  <span>•</span>
                  <span className="text-on-surface-variant">{flight.operatedBy}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Timing Info */}
        <div className="flex items-center gap-space-lg flex-1 justify-center max-w-xl">
          <div className="text-right">
            <div className="font-headline-md text-headline-md font-bold text-on-surface">{flight.overallDepartureTime || segment.departureTime}</div>
            <div className="font-label-data-mono text-label-data-mono text-outline font-semibold">{flight.overallOrigin || segment.origin}</div>
          </div>
          
          <div className="flex flex-col items-center flex-1 px-space-sm min-w-[120px]">
            <span className={`font-label-data-mono text-label-data-mono font-semibold pb-1 ${flight.isCheapest ? 'text-secondary' : flight.isBest ? 'text-tertiary' : flight.isFastest ? 'text-primary' : 'text-on-surface-variant'}`}>
              {flight.totalDuration}
            </span>
            <div className="relative w-full flex items-center justify-center h-4 mb-1">
              <div className={`w-full h-0.5 ${flight.isCheapest ? 'bg-secondary/40' : flight.isBest ? 'bg-tertiary/40' : flight.isFastest ? 'bg-primary/40' : 'bg-outline-variant'}`}></div>
              <span className={`material-symbols-outlined text-base absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${flight.isCheapest ? 'text-secondary' : flight.isBest ? 'text-tertiary' : flight.isFastest ? 'text-primary' : 'text-outline'}`}>
                flight
              </span>
            </div>
            <div className={`flex flex-col items-center gap-0.5 text-[11px] font-mono ${flight.isCheapest ? 'text-secondary' : flight.isBest ? 'text-tertiary' : flight.isFastest ? 'text-primary' : 'text-outline'}`}>
              <div className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${flight.isCheapest ? 'bg-secondary' : flight.isBest ? 'bg-tertiary' : flight.isFastest ? 'bg-primary' : 'bg-outline'}`}></span>
                <span>{flight.stops === 0 ? (flight.isFastest ? 'Fastest Nonstop' : flight.isBest ? 'Nonstop Flight' : 'Nonstop') : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}</span>
              </div>
              {flight.stops > 0 && flight.segments.length > 1 && (
                 <span className="text-outline-variant text-[10px]">
                   Via {flight.segments.slice(0, -1).map(s => s.destination).join(', ')}
                 </span>
              )}
            </div>
          </div>
          
          <div className="text-left">
            <div className="font-headline-md text-headline-md font-bold text-on-surface">
              {flight.overallArrivalTime || segment.arrivalTime}
            </div>
            <div className="font-label-data-mono text-label-data-mono text-outline font-semibold">{flight.overallDestination || segment.destination}</div>
          </div>
        </div>
        
        {/* Pricing & Booking */}
        <div className="flex lg:flex-col items-end justify-between border-t lg:border-t-0 lg:border-l border-outline-variant/30 pt-space-sm lg:pt-0 lg:pl-space-lg gap-space-xs">
          <div className="flex flex-col items-start lg:items-end">
            <span className={`font-label-badge text-label-badge font-mono uppercase ${flight.isCheapest ? 'text-tertiary' : flight.isBest ? 'text-tertiary' : flight.isFastest ? 'text-primary' : 'text-outline'}`}>
              {flight.priceDifference ? flight.priceDifference.text.split(' vs ')[0] + ' vs Google Flights' : 'Standard Rate'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`font-headline-lg text-headline-lg font-extrabold ${flight.isCheapest || flight.isBest ? 'text-tertiary' : 'text-on-surface'}`}>
                {formattedPrice}
              </span>
              <span className="text-body-sm text-outline font-mono">total round trip</span>
            </div>
            <span className="text-[11px] text-outline font-mono">
              {flight.isCheapest ? 'Taxes & fees included' : flight.isBest ? 'Taxes & bag fees included' : flight.isFastest ? 'Free cancellation 24h' : 'Delta SkyMiles eligible'}
            </span>
          </div>
          
          <a href={flight.bookingLink || '#'} target="_blank" rel="noopener noreferrer" className={`px-space-lg py-space-xs rounded-xl font-label-data-mono text-label-data-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${getButtonColor()} ${flight.isCheapest || flight.isBest ? 'bg-gradient-to-r hover:brightness-110 active:scale-95' : ''}`}>
            <span>{flight.isCheapest || flight.isBest ? `Lock ${flight.isCheapest ? 'Deal' : 'Fare'} ${formattedPrice}` : 'Select Flight'}</span>
            <span className="material-symbols-outlined text-sm">
              {flight.isCheapest ? 'bolt' : flight.isBest ? 'lock' : 'arrow_forward'}
            </span>
          </a>
        </div>
      </div>
      
      {/* Features Footer */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs border-t border-surface-container-highest text-body-sm text-outline">
        <div className="flex flex-wrap items-center gap-space-md">
          <span className="flex items-center gap-1 text-on-surface-variant font-label-data-mono text-label-data-mono text-xs">
            <span className="material-symbols-outlined text-sm text-primary">wifi</span> {flight.features.wifi}
          </span>
          {flight.features.dining && (
            <span className="flex items-center gap-1 text-on-surface-variant font-label-data-mono text-label-data-mono text-xs">
              <span className="material-symbols-outlined text-sm text-primary">{flight.isBest ? 'airline_seat_recline_extra' : 'restaurant'}</span> {flight.features.dining}
            </span>
          )}
          {flight.features.entertainment && (
            <span className="flex items-center gap-1 text-on-surface-variant font-label-data-mono text-label-data-mono text-xs">
              <span className="material-symbols-outlined text-sm text-primary">tv</span> {flight.features.entertainment}
            </span>
          )}
          <span className={`flex items-center gap-1 font-label-data-mono text-label-data-mono text-xs ${flight.baggage.checked > 0 ? 'text-tertiary' : 'text-outline'}`}>
            <span className="material-symbols-outlined text-sm">luggage</span> 
            {flight.baggage.checked > 0 ? `${flight.baggage.checked} Checked Bags Included` : '1 Carry-On + Personal Item'}
          </span>
        </div>
        
        <div className="flex items-center gap-space-sm text-xs font-mono">
          {!flight.isCheapest && (
             <span className="text-outline">Fare code: {flight.fareCode}</span>
          )}
          <span className={flight.isBest ? 'text-tertiary font-semibold' : 'text-outline'}>
            • {flight.seatsLeft} seats left
          </span>
        </div>
      </div>
    </div>
  );
}

export default FlightCard;
