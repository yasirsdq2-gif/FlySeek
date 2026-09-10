import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  currency: string;
  setCurrency: (c: string) => void;
}

export default function Layout({ children, currency, setCurrency }: LayoutProps) {
  return (
    <>
      <Header currency={currency} setCurrency={setCurrency} />
      <main className="w-full pt-16 bg-surface relative overflow-x-hidden min-h-screen flex flex-col">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-96 right-1/4 w-[28rem] h-[28rem] bg-secondary-container/15 rounded-full blur-[140px] pointer-events-none"></div>
        
        <div className="flex-1 flex flex-col relative z-10 w-full">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
