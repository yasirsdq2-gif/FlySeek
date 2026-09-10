import React, { useMemo } from 'react';
import { FlightOption } from '../types';

interface SidebarFiltersProps {
  flights: FlightOption[];
  maxStops: number | null;
  setMaxStops: (s: number | null) => void;
  selectedAirlines: string[];
  setSelectedAirlines: (a: string[]) => void;
  maxPrice: number | null;
  setMaxPrice: (p: number | null) => void;
  currency: string;
}

export default function SidebarFilters({
  flights, maxStops, setMaxStops, selectedAirlines, setSelectedAirlines, maxPrice, setMaxPrice, currency
}: SidebarFiltersProps) {
  
  const minPriceOfAll = useMemo(() => {
    if (!flights.length) return 0;
    return Math.min(...flights.map(f => f.price));
  }, [flights]);

  const maxPriceOfAll = useMemo(() => {
    if (!flights.length) return 1000;
    return Math.max(...flights.map(f => f.price));
  }, [flights]);

  const airlinesWithPrices = useMemo(() => {
    const map = new Map<string, number>();
    flights.forEach(f => {
      const name = f.segments[0].airlineName;
      if (!map.has(name) || map.get(name)! > f.price) {
        map.set(name, f.price);
      }
    });
    return Array.from(map.entries()).map(([name, price]) => ({ name, minPrice: price })).sort((a, b) => a.minPrice - b.minPrice);
  }, [flights]);

  const toggleAirline = (name: string) => {
    if (selectedAirlines.includes(name)) {
      setSelectedAirlines(selectedAirlines.filter(a => a !== name));
    } else {
      setSelectedAirlines([...selectedAirlines, name]);
    }
  };

  const currentMaxPrice = maxPrice ?? maxPriceOfAll;

  return (
    <aside className="lg:col-span-3 bg-surface-container-low/90 border border-outline-variant/30 rounded-2xl p-space-md flex flex-col gap-space-md sticky top-48">
      <div className="flex items-center justify-between border-b border-surface-container-highest pb-space-xs">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-base">tune</span>
          <span className="font-headline-md text-headline-md font-bold text-on-surface text-base">Deep Filters</span>
        </div>
        <button 
          onClick={() => {
            setMaxStops(null);
            setSelectedAirlines([]);
            setMaxPrice(null);
          }}
          className="text-xs text-outline hover:text-primary font-label-data-mono transition-colors"
        >
          Reset All
        </button>
      </div>
      
      {/* Flight Stops */}
      <div className="flex flex-col gap-space-xs">
        <span className="font-label-badge text-label-badge uppercase tracking-wider text-outline font-semibold">Flight Stops</span>
        <div className="flex flex-col gap-1.5 mt-1">
          <label className="flex items-center gap-3 py-2 cursor-pointer group">
            <div className="relative flex items-center">
              <input 
                type="radio" 
                name="stops"
                checked={maxStops === null}
                onChange={() => setMaxStops(null)}
                className="peer appearance-none w-5 h-5 border-2 border-outline-variant rounded-full checked:border-primary transition-all cursor-pointer" 
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-body-sm text-on-surface group-hover:text-primary transition-colors">Any number of stops</span>
          </label>
          <label className="flex items-center gap-3 py-2 cursor-pointer group">
            <div className="relative flex items-center">
              <input 
                type="radio" 
                name="stops"
                checked={maxStops === 0}
                onChange={() => setMaxStops(0)}
                className="peer appearance-none w-5 h-5 border-2 border-outline-variant rounded-full checked:border-primary transition-all cursor-pointer" 
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-body-sm text-on-surface group-hover:text-primary transition-colors">Nonstop only</span>
          </label>
          <label className="flex items-center gap-3 py-2 cursor-pointer group">
            <div className="relative flex items-center">
              <input 
                type="radio" 
                name="stops"
                checked={maxStops === 1}
                onChange={() => setMaxStops(1)}
                className="peer appearance-none w-5 h-5 border-2 border-outline-variant rounded-full checked:border-primary transition-all cursor-pointer" 
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-body-sm text-on-surface group-hover:text-primary transition-colors">1 stop or fewer</span>
          </label>
        </div>
      </div>
      
      {/* Max Price */}
      <div className="border-t border-surface-container-highest pt-space-md flex flex-col gap-space-sm mt-2">
        <div className="flex items-center justify-between">
          <span className="font-label-badge text-label-badge uppercase tracking-wider text-outline font-semibold">Max Price</span>
          <span className="font-label-data-mono text-on-surface font-semibold text-sm bg-surface-container px-2 py-0.5 rounded-full">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(currentMaxPrice)}
          </span>
        </div>
        <div className="w-full flex flex-col pt-2 pb-1 relative">
          <input 
            type="range"
            min={minPriceOfAll}
            max={maxPriceOfAll}
            value={currentMaxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
          />
          <div className="flex justify-between text-[11px] text-outline font-mono mt-3">
            <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(minPriceOfAll)}</span>
            <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(maxPriceOfAll)}</span>
          </div>
        </div>
      </div>
      
      {/* Airlines */}
      <div className="border-t border-surface-container-highest pt-space-md flex flex-col gap-space-sm mt-2">
        <span className="font-label-badge text-label-badge uppercase tracking-wider text-outline font-semibold">Airlines</span>
        <div className="flex flex-col mt-1 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
          {airlinesWithPrices.length > 0 && (
            <label className="flex items-center justify-between py-2.5 cursor-pointer group border-b border-surface-container/50">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    checked={selectedAirlines.length === 0}
                    onChange={() => setSelectedAirlines([])}
                    className="peer appearance-none w-5 h-5 border-2 border-outline-variant rounded-md checked:bg-primary checked:border-primary transition-all cursor-pointer" 
                  />
                  <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-on-primary text-[14px] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">check</span>
                </div>
                <span className="text-body-sm text-on-surface font-semibold group-hover:text-primary transition-colors">Select All</span>
              </div>
            </label>
          )}
          {airlinesWithPrices.map(({ name, minPrice }) => (
             <label key={name} className="flex items-center justify-between py-2.5 cursor-pointer group border-b border-surface-container/50 last:border-0">
               <div className="flex items-center gap-3">
                 <div className="relative flex items-center">
                   <input 
                     type="checkbox" 
                     checked={selectedAirlines.includes(name)}
                     onChange={() => toggleAirline(name)}
                     className="peer appearance-none w-5 h-5 border-2 border-outline-variant rounded-md checked:bg-primary checked:border-primary transition-all cursor-pointer" 
                   />
                   <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-on-primary text-[14px] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">check</span>
                 </div>
                 <span className="text-body-sm text-on-surface group-hover:text-primary transition-colors truncate max-w-[140px]" title={name}>{name}</span>
               </div>
               <span className="font-label-data-mono text-tertiary font-medium text-[13px]">
                 {new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(minPrice)}
               </span>
             </label>
          ))}
          {airlinesWithPrices.length === 0 && (
             <span className="text-xs text-outline italic p-1">No airlines available</span>
          )}
        </div>
      </div>
    </aside>
  );
}
