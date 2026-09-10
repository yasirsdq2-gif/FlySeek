import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest mt-space-3xl py-space-2xl">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop flex flex-col md:flex-row items-center justify-between gap-space-base text-on-surface-variant font-body-sm text-body-sm">
        <div className="flex items-center gap-space-sm">
          <span className="font-headline-md text-headline-md font-bold text-on-surface">FlySeek</span>
          <span className="font-label-badge text-label-badge text-outline">Global Telemetry v3.4</span>
        </div>
        <div className="flex items-center gap-space-lg text-outline">
          <a className="hover:text-primary transition-colors" href="#">Matrix Search</a>
          <a className="hover:text-primary transition-colors" href="#">Route Isobars</a>
          <a className="hover:text-primary transition-colors" href="#">Fare Predictor</a>
          <a className="hover:text-primary transition-colors" href="#">Error Fares</a>
        </div>
        <div className="text-outline-variant font-label-data-mono text-label-data-mono">
          © 2025 FlySeek Technologies Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
