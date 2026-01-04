# Smart Route - Road Anomaly Detection System

A comprehensive web application for detecting, tracking, and navigating around road anomalies in real-time. Smart Route helps drivers avoid potholes, rough roads, and other hazards by providing intelligent route optimization and real-time alerts.

## Features

### Core Features
- **Real-Time Anomaly Detection**: Detect road anomalies using sensors and AI algorithms
- **Interactive Map Navigation**: View and navigate around detected road hazards
- **Journey Tracking**: Track and review past journeys with anomaly encounters
- **Comprehensive Dashboard**: View statistics on detected anomalies, journeys, and road conditions
- **Smart Routing**: Get optimized routes that avoid road hazards

### Key Capabilities
- 🗺️ **Interactive Maps**: Powered by Leaflet and Google Maps for accurate visualization
- 📊 **Analytics Dashboard**: Real-time statistics on road conditions and anomalies
- 🚗 **Journey History**: Track all your past journeys and anomalies encountered
- ⚠️ **Anomaly Database**: Comprehensive list of all detected road anomalies
- 📍 **Location Services**: Real-time location tracking and geocoding
- 🌓 **Dark/Light Mode**: Customizable interface for day and night driving

## Technology Stack

- **Frontend**: React 18 with Vite
- **UI Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Maps**: Leaflet, React Leaflet, Google Maps API
- **Data Fetching**: TanStack Query (React Query)
- **Notifications**: React Hot Toast
- **Icons**: React Icons

## Installation

### Prerequisites
- Node.js (v14 or higher)
- pnpm (or npm/yarn)

### Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd Smart-Route
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Build for production:
```bash
pnpm build
```

5. Preview production build:
```bash
pnpm preview
```

## Project Structure

```
src/
├── Components/          # Reusable components
│   ├── GeneralAnomalies.jsx
│   ├── Journeys/
│   └── Leaflet/
├── Features/           # Feature-specific modules
│   └── user/
├── Pages/             # Main application pages
│   ├── Dashboard/
│   ├── Home/
│   └── Map/
├── services/          # API and service functions
│   ├── anomalies.js
│   ├── journeys.js
│   └── apis.js
├── ui/               # UI components
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   └── MapComponent.jsx
└── utils/            # Utility functions
```

## Usage

### Starting a Journey
1. Open the sidebar navigation
2. Enter your current location (or use "Use current location")
3. Enter your destination
4. Click "Start a journey"
5. View the optimized route avoiding road anomalies

### Viewing Anomalies
1. Navigate to "View All Anomalies" from the sidebar
2. Browse the complete list of detected road hazards
3. View details including location, type, severity, and timestamp

### Dashboard
1. Access the dashboard from the home page
2. View statistics on:
   - Total anomalies detected
   - Critical road issues
   - Smooth road sections
   - Total journeys completed

## Features in Detail

### Real-Time Detection
- AI-powered anomaly detection
- Sensor data integration
- Instant notifications

### Accurate Mapping
- High-precision GPS coordinates
- Detailed road condition visualization
- Multiple map provider support

### Data-Driven Insights
- Analytics on anomaly frequency and severity
- Historical journey data
- Location-based statistics

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is part of a road safety initiative to improve driving conditions.

## Contact

For questions or support, please contact the development team.
