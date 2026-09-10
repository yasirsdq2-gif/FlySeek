# FlySeek - Modern Flight Search Application

A premium, dark-themed flight search engine with real-time data fetching from Google Flights. Features a modern UI, global airport support, multi-currency pricing, comprehensive flight details, and seamless booking integration.

![FlySeek Preview](preview.png)

## ✨ Features

- **Real-Time Flight Data**: Direct integration with Google Flights via protocol buffers (no API key required, 100% free & unlimited for normal use)
- **Global Airport Support**: Autocomplete for all international airports across all countries with intelligent city/country mapping
- **Advanced Search Options**:
  - Trip types: Round trip, One way, Multi-city
  - Passenger configuration (Adults, Children, Infants in seat, Infants on lap)
  - Cabin class selection (Economy, Premium Economy, Business, First)
  - Direct flights only toggle
- **Smart Filtering**:
  - Nonstop/1-stop/Any stops radio filters (Google Flights-style)
  - Dynamic price range slider with auto-updating min/max
  - Airline selection with "Select All" option
- **Multi-Currency Support**: Switch between PKR, USD, EUR, GBP, AED, SAR, INR, JPY, CAD, AUD, and more with automatic price updates
- **Detailed Flight Cards**:
  - Complete itinerary with all segments and layover details
  - Duration, departure/arrival times with timezone awareness
  - Baggage allowance information
  - Aircraft type and airline details
  - Direct booking links to official airline/partner sites
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern Dark UI**: Aero Intelligence color palette with deep surface blues, neon teal accents, and vibrant blue primary containers
- **Clean Interface**: Removed unnecessary elements, optimized spacing, fixed overlapping issues

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd fast-flights-ts
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173` (or the port shown in your terminal)

**That's it!** No API keys or configuration needed. The app works out of the box.

## 📁 Project Structure

```
fast-flights-ts/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation bar with currency selector
│   │   ├── Footer.tsx       # Footer component
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   ├── SearchWidget.tsx # Search form with airport/date inputs
│   │   ├── FlightCard.tsx   # Individual flight result card
│   │   ├── SidebarFilters.tsx # Filter controls (price, airlines, stops)
│   │   └── FareTracker.tsx  # Price trend visualization
│   ├── data/
│   │   └── airports.ts      # Airport data utilities
│   ├── types.ts             # TypeScript type definitions
│   ├── App.tsx              # Main application component
│   └── index.css            # Global styles with Tailwind
├── server.ts                # Express backend for flight API calls
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## 🔧 Configuration

### Environment Variables (Optional)

This application works out of the box without any API keys! However, you can optionally configure:

Create a `.env` file in the root directory:

```env
# Optional: Custom port for the dev server
PORT=5173

# Optional: Custom API port for backend
API_PORT=3001
```

No API keys are required since we use the open-source `fast-flights-ts` library that connects directly to Google Flights.

## 🎯 How to Use

### 1. Search for Flights

1. Enter **Origin** and **Destination** cities/airports using the autocomplete dropdown
   - Type city name or airport code (e.g., "London", "LHR", "New York", "JFK")
   - Select from the dropdown showing city, country, and airport name
2. Select your **Trip Type** (Round trip, One way, or Multi-city)
3. Choose **Departure** and **Return** dates (if applicable)
   - Click the date field to open the calendar picker
   - Select your travel dates
4. Configure **Passengers**:
   - Click the passengers button
   - Adjust Adults (12+ years)
   - Add Children (2-11 years)
   - Add Infants in seat (under 2 years with own seat)
   - Add Infants on lap (under 2 years sharing seat)
5. Select **Cabin Class**:
   - Economy (standard seating)
   - Premium Economy (extra legroom)
   - Business (lie-flat seats on most airlines)
   - First (luxury experience)
6. Toggle **Direct only** if you want nonstop flights only
7. Click **Search** button

### 2. Filter Results

Use the sidebar filters to refine your search:

- **Stops** (Radio buttons):
  - Any number of stops (default, shows all flights)
  - Nonstop only (0 stops, direct flights)
  - 1 stop or fewer (nonstop + 1-stop flights)
  
- **Max Price**: 
  - Drag the slider to set your budget limit
  - Minimum value auto-adjusts based on search results
  - Maximum value shows the highest priced flight
  
- **Airlines**: 
  - Check/uncheck specific airlines to filter
  - Use "Select All" checkbox at top to show/hide all airlines
  - List dynamically generated from actual search results

### 3. View Flight Details

Each flight card displays:

- **Price**: Total price per person in selected currency
- **Airline**: Airline name and logo
- **Times**: Departure and arrival times with local timezones
- **Duration**: Total travel time including layovers
- **Route**: Complete itinerary showing:
  - Origin airport → Layover(s) → Destination airport
  - Layover duration and location (e.g., "Via DXB - 2h 15m")
  - Number of stops clearly indicated
- **Flight Numbers**: Individual segment flight numbers
- **Aircraft**: Aircraft type for each segment
- **Baggage**: Allowance information (carry-on, checked bags)
- **Booking Link**: "Select Flight" button redirects to official booking page

### 4. Change Currency

1. Click the currency dropdown in the header (shows current currency like "USD" or "PKR")
2. Select from available currencies:
   - PKR (Pakistani Rupee) - Rs
   - USD (US Dollar) - $
   - EUR (Euro) - €
   - GBP (British Pound) - £
   - AED (UAE Dirham) - AED
   - SAR (Saudi Riyal) - SR
   - INR (Indian Rupee) - ₹
   - JPY (Japanese Yen) - ¥
   - CAD (Canadian Dollar) - C$
   - AUD (Australian Dollar) - A$
   - And more...
3. Prices automatically update with live conversion rates
4. Search re-executes with new currency to fetch accurate pricing

### 5. Book Your Flight

1. Find your preferred flight from the results
2. Review all details (times, layovers, baggage, price)
3. Click **"Select Flight"** button
4. You'll be redirected to:
   - Official airline website, OR
   - Authorized booking partner (Expedia, Kayak, etc.)
5. Complete your purchase directly with the provider
6. Your booking is confirmed directly with the airline

**Note**: FlySeek is a search engine. Actual bookings are completed on the airline's or partner's website for security and customer service.

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run TypeScript type checking
npm run type-check

# Lint code
npm run lint
```

### Adding New Features

#### Add a New Currency

Edit `src/components/Header.tsx` and add to the currency list:

```typescript
const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee' },
  // Add your currency here
  { code: 'XYZ', symbol: '₿', name: 'New Currency' },
];
```

#### Add Custom Airport Data

The app uses the `airport-data-js` library which includes all IATA airports globally. If you need to add custom airports, modify `src/data/airports.ts`.

## 🐛 Troubleshooting

### Issue: No flights showing up

**Solution**: 
- Ensure you have a stable internet connection
- Try different routes (some remote airports may have limited data)
- Clear browser cache and reload
- Check if the backend server is running (should start automatically with `npm run dev`)
- Try major routes first (e.g., LHR-JFK, DXB-LHR) to verify functionality

### Issue: Prices showing as 0 or missing

**Solution**: 
- This has been fixed in the current version
- The app now filters out incomplete itineraries without valid pricing
- If you still see this, try refreshing the search

### Issue: Overlapping elements or layout issues

**Solution**: 
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge - latest versions)
- The layout has been optimized for all screen sizes
- Try resizing the browser window

### Issue: Airport search not working or showing wrong names

**Solution**: 
- Type at least 2-3 characters to trigger autocomplete
- Select from the dropdown - don't just type and submit
- The dropdown shows: City, Country - Airport Name (IATA Code)
- Example: "Riyadh, Saudi Arabia - King Khalid Int'l (RUH)"
- Ensure the backend server is running (`npm run dev` starts both frontend and backend)

### Issue: Currency not updating prices

**Solution**: 
- Wait a moment after switching currency (search re-executes automatically)
- Check your internet connection
- Try selecting a different currency and back
- Clear browser cache if issue persists

### Issue: Filters not working correctly

**Solution**: 
- For airline filters: Make sure "Select All" is checked to see all flights
- For stop filters: Use radio buttons (they're mutually exclusive now)
  - "Any number of stops" = shows everything
  - "Nonstop only" = direct flights only
  - "1 stop or fewer" = nonstop + 1-stop flights
- Price slider auto-adjusts based on search results

### Issue: Booking link not working

**Solution**: 
- Click the "Select Flight" button on the flight card
- Ensure popup blocker is disabled for localhost
- The link opens in a new tab to the official booking site
- Some airlines may require date selection again on their site

### Issue: Slow search performance

**Solution**: 
- This is normal for real-time flight searches
- Google Flights integration typically takes 2-5 seconds
- Complex routes with many options may take longer
- Ensure good internet connection
- Try searching during off-peak hours

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [fast-flights-ts](https://github.com/priceline/fast-flights-ts) - For the amazing Google Flights integration library
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [React](https://react.dev/) - For the UI library
- [Google Flights](https://www.google.com/flights) - For the flight data source

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review existing GitHub issues
3. Create a new issue with detailed information about your problem

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
