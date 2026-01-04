import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Map from './Pages/Map/Map'
import AppLayout from './AppLayout'
import Home from './Pages/Home/Home'
import GeneralAnomalies from './Components/GeneralAnomalies'
import PastJourneys from './Components/Journeys/PastJourneys'
import Dashboard from './Pages/Dashboard/Dashboard'
import EmergencyAlert from './Components/Emergency/EmergencyAlert'
import WeatherOverlay from './Components/Weather/WeatherOverlay'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='map' element={<Map />} />
            <Route path='all-anomalies' element={<GeneralAnomalies/>} />
            <Route path='past-journeys' element={<PastJourneys />} />
          </Route >
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        {/* Global components */}
        <EmergencyAlert />
        <WeatherOverlay />
      </BrowserRouter>
    </div>
  )
}
