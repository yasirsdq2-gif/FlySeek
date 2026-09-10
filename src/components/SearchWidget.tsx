import React, { useState, useRef, useEffect } from 'react';

interface SearchWidgetProps {
  onSearch: (params: any) => void;
  isLoading?: boolean;
}

export default function SearchWidget({ onSearch, isLoading }: SearchWidgetProps) {
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway' | 'multicity'>('roundtrip');
  
  // Real Date defaults: +1 week and +2 weeks
  const defaultOutbound = new Date();
  defaultOutbound.setDate(defaultOutbound.getDate() + 7);
  const defaultReturn = new Date();
  defaultReturn.setDate(defaultReturn.getDate() + 14);
  
  const [originCode, setOriginCode] = useState('SFO');
  const [originSearch, setOriginSearch] = useState('San Francisco Intl');
  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [originSuggestions, setOriginSuggestions] = useState<any[]>([]);
  
  const [destCode, setDestCode] = useState('HND');
  const [destSearch, setDestSearch] = useState('Tokyo Haneda');
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [destSuggestions, setDestSuggestions] = useState<any[]>([]);
  
  const [outboundDate, setOutboundDate] = useState(defaultOutbound.toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState(defaultReturn.toISOString().split('T')[0]);
  const [directOnly, setDirectOnly] = useState(false);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infantsInSeat, setInfantsInSeat] = useState(0);
  const [infantsOnLap, setInfantsOnLap] = useState(0);
  const [cabinClass, setCabinClass] = useState('economy');

  const [isPassengersOpen, setIsPassengersOpen] = useState(false);
  const [isCabinOpen, setIsCabinOpen] = useState(false);

  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);
  const passengersRef = useRef<HTMLDivElement>(null);
  const cabinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (originRef.current && !originRef.current.contains(event.target as Node)) {
        setIsOriginOpen(false);
      }
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setIsDestOpen(false);
      }
      if (passengersRef.current && !passengersRef.current.contains(event.target as Node)) {
        setIsPassengersOpen(false);
      }
      if (cabinRef.current && !cabinRef.current.contains(event.target as Node)) {
        setIsCabinOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwap = () => {
    const tempC = originCode;
    const tempS = originSearch;
    setOriginCode(destCode);
    setOriginSearch(destSearch);
    setDestCode(tempC);
    setDestSearch(tempS);
  };

  const handleSearch = () => {
    onSearch({ tripType, origin: originCode, destination: destCode, outboundDate, returnDate, directOnly, adults, children, infantsInSeat, infantsOnLap, cabinClass });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (originSearch.length >= 2 && isOriginOpen) {
        fetch(`/api/airports?q=${originSearch}`)
          .then(res => res.json())
          .then(data => setOriginSuggestions(data))
          .catch(err => console.error(err));
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [originSearch, isOriginOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (destSearch.length >= 2 && isDestOpen) {
        fetch(`/api/airports?q=${destSearch}`)
          .then(res => res.json())
          .then(data => setDestSuggestions(data))
          .catch(err => console.error(err));
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [destSearch, isDestOpen]);

  return (
    <div className="border-b border-surface-container-high/60 bg-surface-container-lowest/80 backdrop-blur-xl relative z-30 shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-md flex flex-col gap-space-sm">
        
        {/* Top Controls */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-2xs bg-surface-container-high/80 p-space-2xs rounded-full">
            <button 
              onClick={() => setTripType('roundtrip')}
              className={`px-space-md py-1 rounded-full font-label-data-mono text-label-data-mono flex items-center gap-1.5 transition-all ${tripType === 'roundtrip' ? 'font-semibold bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(56,189,248,0.35)]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}
            >
              <span className="material-symbols-outlined text-sm">sync_alt</span>
              <span>Round trip</span>
            </button>
            <button 
              onClick={() => setTripType('oneway')}
              className={`px-space-md py-1 rounded-full font-label-data-mono text-label-data-mono flex items-center gap-1.5 transition-all ${tripType === 'oneway' ? 'font-semibold bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(56,189,248,0.35)]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}
            >
              <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
              <span>One way</span>
            </button>
            <button 
              onClick={() => setTripType('multicity')}
              className={`px-space-md py-1 rounded-full font-label-data-mono text-label-data-mono flex items-center gap-1.5 transition-all ${tripType === 'multicity' ? 'font-semibold bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(56,189,248,0.35)]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}
            >
              <span className="material-symbols-outlined text-sm">alt_route</span>
              <span>Multi-city</span>
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-space-sm">
            {/* Passengers */}
            <div className="relative" ref={passengersRef}>
              <button 
                onClick={() => setIsPassengersOpen(!isPassengersOpen)}
                className="flex items-center gap-1.5 px-space-md py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-data-mono text-label-data-mono font-medium border border-outline-variant/30"
              >
                <span className="material-symbols-outlined text-primary text-sm">person</span>
                <span>{adults + children + infantsInSeat + infantsOnLap}</span>
                <span className="material-symbols-outlined text-outline text-sm">keyboard_arrow_down</span>
              </button>
              
              {isPassengersOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-[#2d2e31] border border-outline-variant/20 rounded-xl shadow-2xl z-50 p-4 flex flex-col gap-4">
                  {[
                    { label: 'Adults', sub: '', val: adults, set: setAdults, min: 1 },
                    { label: 'Children', sub: 'Aged 2-11', val: children, set: setChildren, min: 0 },
                    { label: 'Infants', sub: 'In seat', val: infantsInSeat, set: setInfantsInSeat, min: 0 },
                    { label: 'Infants', sub: 'On lap', val: infantsOnLap, set: setInfantsOnLap, min: 0 },
                  ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-on-surface text-sm font-medium">{p.label}</span>
                        {p.sub && <span className="text-outline text-xs">{p.sub}</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => p.val > p.min && p.set(p.val - 1)}
                          disabled={p.val <= p.min}
                          className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="w-4 text-center text-sm">{p.val}</span>
                        <button 
                          onClick={() => p.set(p.val + 1)}
                          className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined text-sm text-primary">add</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-white/10">
                    <button onClick={() => setIsPassengersOpen(false)} className="px-4 py-2 text-primary text-sm font-medium hover:bg-primary/10 rounded-full">Done</button>
                  </div>
                </div>
              )}
            </div>

            {/* Cabin Class */}
            <div className="relative" ref={cabinRef}>
              <button 
                onClick={() => setIsCabinOpen(!isCabinOpen)}
                className="flex items-center gap-1.5 px-space-md py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-data-mono text-label-data-mono font-medium border border-outline-variant/30 capitalize"
              >
                <span>{cabinClass}</span>
                <span className="material-symbols-outlined text-outline text-sm">keyboard_arrow_down</span>
              </button>
              
              {isCabinOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#2d2e31] border border-outline-variant/20 rounded-xl shadow-2xl z-50 py-2">
                  {['economy', 'premium economy', 'business', 'first'].map(c => (
                    <button 
                      key={c}
                      onClick={() => {
                        setCabinClass(c);
                        setIsCabinOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 flex items-center justify-between capitalize"
                    >
                      <span className={cabinClass === c ? 'text-on-surface' : 'text-outline'}>{c}</span>
                      {cabinClass === c && <span className="material-symbols-outlined text-primary text-sm">check</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <label className="flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-low cursor-pointer select-none hover:bg-surface-container transition-colors border border-outline-variant/30">
              <input 
                type="checkbox" 
                checked={directOnly}
                onChange={(e) => setDirectOnly(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-7 h-3.5 bg-surface-variant peer-checked:bg-primary-container rounded-full relative transition-colors">
                <div className="w-2.5 h-2.5 bg-surface rounded-full absolute top-0.5 left-0.5 peer-checked:translate-x-3.5 transition-transform shadow"></div>
              </div>
              <span className="font-label-data-mono text-label-data-mono text-on-surface-variant peer-checked:text-on-surface font-medium text-xs">Direct only</span>
            </label>
          </div>
        </div>
        
        {/* Search Inputs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xs items-stretch relative">
          {/* Origin */}
          <div ref={originRef} className="lg:col-span-3 relative flex flex-col justify-center bg-surface-container-high/90 p-space-sm rounded-xl border border-outline-variant/30 hover:border-primary/40 focus-within:border-primary transition-all group">
            <div className="flex items-center justify-between">
              <span className="font-label-badge text-label-badge uppercase tracking-wider text-outline font-semibold">Origin</span>
              <span className="font-label-data-mono text-label-data-mono text-tertiary flex items-center gap-0.5 text-xs">
                <span className="material-symbols-outlined text-xs">my_location</span>
                {originCode}
              </span>
            </div>
            <input 
              type="text" 
              value={originSearch}
              onFocus={() => setIsOriginOpen(true)}
              onChange={(e) => {
                setOriginSearch(e.target.value);
                setIsOriginOpen(true);
              }}
              className="bg-transparent border-none outline-none font-headline-md text-headline-md text-on-surface font-bold mt-0.5 tracking-tight w-full"
              spellCheck="false"
              placeholder="City or Airport"
            />
            {isOriginOpen && originSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#2d2e31] border border-outline-variant/20 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                {originSuggestions.map(apt => (
                  <div 
                    key={apt.iata || apt.icao}
                    className="px-4 py-3 hover:bg-white/5 cursor-pointer flex items-center gap-4 border-b border-white/5 last:border-0 transition-colors"
                    onClick={() => {
                      setOriginCode(apt.iata || apt.icao);
                      // Display city name prominently, with airport as secondary info
                      const displayCity = apt.city.replace(/Intl|International/gi, '').trim();
                      setOriginSearch(displayCity);
                      setIsOriginOpen(false);
                    }}
                  >
                    <span className="material-symbols-outlined text-outline-variant text-xl">flight</span>
                    <div className="flex flex-col text-left">
                      <div className="font-bold text-on-surface text-sm">{apt.city.replace(/Intl|International/gi, '').trim()} <span className="font-normal text-outline-variant ml-1">{apt.iata || apt.icao}</span></div>
                      <div className="text-xs text-outline">{apt.airport}, {apt.country}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between text-body-sm text-outline h-5">
              <span className="truncate"></span>
            </div>
          </div>
          
          {/* Swap Button */}
          <div className="hidden lg:flex absolute left-[24.4%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <button 
              onClick={handleSwap}
              className="w-8 h-8 rounded-full bg-surface-bright hover:bg-primary text-on-surface hover:text-on-primary flex items-center justify-center shadow-lg transition-all transform hover:rotate-180"
            >
              <span className="material-symbols-outlined text-sm">sync_alt</span>
            </button>
          </div>
          
          {/* Destination */}
          <div ref={destRef} className="lg:col-span-3 relative flex flex-col justify-center bg-surface-container-high/90 p-space-sm rounded-xl border border-outline-variant/30 hover:border-primary/40 focus-within:border-primary transition-all group">
            <div className="flex items-center justify-between">
              <span className="font-label-badge text-label-badge uppercase tracking-wider text-outline font-semibold">Destination</span>
              <span className="font-label-data-mono text-label-data-mono text-secondary flex items-center gap-0.5 text-xs">
                {destCode}
              </span>
            </div>
            <input 
              type="text" 
              value={destSearch}
              onFocus={() => setIsDestOpen(true)}
              onChange={(e) => {
                setDestSearch(e.target.value);
                setIsDestOpen(true);
              }}
              className="bg-transparent border-none outline-none font-headline-md text-headline-md text-on-surface font-bold mt-0.5 tracking-tight w-full"
              spellCheck="false"
              placeholder="City or Airport"
            />
            {isDestOpen && destSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#2d2e31] border border-outline-variant/20 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                {destSuggestions.map(apt => (
                  <div 
                    key={apt.iata || apt.icao}
                    className="px-4 py-3 hover:bg-white/5 cursor-pointer flex items-center gap-4 border-b border-white/5 last:border-0 transition-colors"
                    onClick={() => {
                      setDestCode(apt.iata || apt.icao);
                      // Display city name prominently, with airport as secondary info
                      const displayCity = apt.city.replace(/Intl|International/gi, '').trim();
                      setDestSearch(displayCity);
                      setIsDestOpen(false);
                    }}
                  >
                    <span className="material-symbols-outlined text-outline-variant text-xl">flight</span>
                    <div className="flex flex-col text-left">
                      <div className="font-bold text-on-surface text-sm">{apt.city.replace(/Intl|International/gi, '').trim()} <span className="font-normal text-outline-variant ml-1">{apt.iata || apt.icao}</span></div>
                      <div className="text-xs text-outline">{apt.airport}, {apt.country}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between text-body-sm text-outline h-5">
              <span className="truncate"></span>
            </div>
          </div>
          
          {/* Dates */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-space-xs">
            <div className="flex flex-col justify-center bg-surface-container-high/90 p-space-sm rounded-xl text-left border border-outline-variant/30 hover:border-primary/40 transition-all relative">
              <div className="flex items-center justify-between w-full">
                <span className="font-label-badge text-label-badge uppercase tracking-wider text-outline font-semibold">Depart</span>
                <span className="material-symbols-outlined text-primary text-sm">calendar_month</span>
              </div>
              <input 
                type="date"
                value={outboundDate}
                onChange={(e) => setOutboundDate(e.target.value)}
                className="bg-transparent border-none outline-none font-headline-md text-headline-md text-on-surface font-bold mt-0.5 tracking-tight w-full cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full"
              />
              <span className="font-label-badge text-label-badge text-tertiary font-mono">Date</span>
            </div>
            <div className={`flex flex-col justify-center p-space-sm rounded-xl text-left border transition-all relative ${tripType === 'oneway' ? 'opacity-50 bg-surface-container/50 border-transparent pointer-events-none' : 'bg-surface-container-high/90 border-outline-variant/30 hover:border-primary/40'}`}>
              <div className="flex items-center justify-between w-full">
                <span className="font-label-badge text-label-badge uppercase tracking-wider text-outline font-semibold">Return</span>
              </div>
              <input 
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                disabled={tripType === 'oneway'}
                className="bg-transparent border-none outline-none font-headline-md text-headline-md text-on-surface font-bold mt-0.5 tracking-tight w-full cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full disabled:cursor-not-allowed"
              />
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                <span className="font-label-badge text-label-badge text-outline">Date</span>
              </div>
            </div>
          </div>
          
          {/* Search Button */}
          <div className="lg:col-span-2 flex">
            <button 
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full h-full min-h-[3.75rem] rounded-xl bg-gradient-to-r from-primary-container via-secondary-container to-primary text-on-primary font-headline-md text-headline-md font-bold flex items-center justify-center gap-space-xs shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                 <span className="material-symbols-outlined text-xl animate-spin">refresh</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl">flight_takeoff</span>
                  <span>Search Flights</span>
                </>
              )}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
