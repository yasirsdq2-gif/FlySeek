import React from 'react';
import { FareTrackerDay } from '../types';

interface FareTrackerProps {
  days: FareTrackerDay[];
}

export default function FareTracker({ days }: FareTrackerProps) {
  return (
    <div className="bg-surface-container-low/95 border border-outline-variant/30 rounded-2xl p-space-md flex flex-col gap-space-sm shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
        <div className="flex items-center gap-space-sm">
          <div className="w-7 h-7 rounded-lg bg-tertiary/15 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-base">calendar_month</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md font-bold text-on-surface text-base">Flexible 7-Day Fare Tracker</span>
            <span className="px-2 py-0.5 rounded bg-tertiary/20 text-tertiary font-label-badge text-label-badge font-bold uppercase">Round-trip Pricing</span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs text-xs font-label-data-mono text-outline">
          <span>Benchmark Departure Window:</span>
          <span className="text-tertiary font-bold font-mono">Oct 16 - 24 saves $264</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {days.map((day, idx) => (
          <button 
            key={idx}
            className={`p-space-xs rounded-xl flex flex-col items-center justify-center transition-all text-center border ${day.isOptimal ? 'bg-tertiary-container/30 border-tertiary ring-2 ring-tertiary/40 shadow-[0_0_20px_rgba(86,229,169,0.3)] transform scale-105' : 'bg-surface-container-lowest/80 border-outline-variant/30 hover:border-primary/40'}`}
          >
            {day.isOptimal ? (
               <div className="flex items-center gap-1">
                 <span className="text-xs text-tertiary font-label-data-mono font-bold">{day.date}</span>
                 <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
               </div>
            ) : (
              <span className="text-xs text-outline font-label-data-mono">{day.date}</span>
            )}
            
            <span className={`font-headline-md text-headline-md font-bold mt-0.5 ${day.isOptimal ? 'text-tertiary font-extrabold' : day.isPeak ? 'text-error/80' : 'text-on-surface-variant'}`}>
              ${day.price}
            </span>
            
            {day.isOptimal ? (
              <span className="font-label-badge text-[9px] uppercase tracking-wider text-on-surface bg-tertiary/20 px-1 rounded font-bold">OPTIMAL LOW</span>
            ) : (
              <span className={`text-[10px] font-mono ${day.isPeak ? 'text-error' : 'text-outline'}`}>
                +${day.difference} {day.isPeak && 'Peak'}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
