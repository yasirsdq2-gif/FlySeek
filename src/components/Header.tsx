import React, { useState, useRef, useEffect } from 'react';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR', 'SGD', 'CHF', 'CNY', 'PKR', 'AED', 'SAR'];

interface HeaderProps {
  currency: string;
  setCurrency: (c: string) => void;
}

export default function Header({ currency, setCurrency }: HeaderProps) {
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/75 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.25)]">
      <div className="h-16 max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-lg">
          <a className="flex items-center gap-space-sm group" href="#">
            <img alt="FlySeek Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W6r0HJcF3wxSK8-3H8h7XfSnn6nePYtxBEORIdS0ItoJF1xCvAGz-N3vA14D2_sDRqH6SDqhQXdq6vNRi0KgZH0oCQBk2_ssFBD3__WIMTs0HlmKAyoTF-j0Ogq9thzmZFFeczaC5r39YJe-vfihoSUGJ4wTgSYBYmKRCVVh6V51bgagNKnn93q_icfXAY6bluvUDnzWfvMDYq8tMWtUX-5zuKb-okZpiENsMKILX7994CB9Ii1dcub_0" />
            <div className="flex flex-col hidden lg:flex">
              <span className="font-label-badge text-label-badge uppercase tracking-widest text-primary mt-1">Aero Intelligence</span>
            </div>
          </a>
        </div>
        
        <div className="flex items-center gap-space-sm lg:gap-space-md">
          <div className="relative group" ref={dropdownRef}>
            <button 
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-data-mono text-label-data-mono transition-all border border-surface-container-high/60 shadow-sm"
            >
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary-container/20 text-primary text-[10px] font-bold">$</span>
              <span className="font-semibold text-on-surface">{currency}</span>
              <span className="text-outline-variant">•</span>
              <span className="text-on-surface-variant font-medium">EN</span>
              <span className={`material-symbols-outlined text-xs text-outline transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            
            {isCurrencyOpen && (
              <div className="absolute top-full right-0 mt-2 bg-surface-container-highest border border-outline-variant/30 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto min-w-[120px]">
                {CURRENCIES.map(curr => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setIsCurrencyOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-surface-container transition-colors ${curr === currency ? 'font-bold text-primary bg-primary-container/10' : 'text-on-surface'}`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
