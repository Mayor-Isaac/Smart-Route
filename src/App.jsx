import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Map from './Pages/Map/Map'
import AppLayout from './AppLayout'
import Home from './Pages/Home/Home'
import GeneralAnomalies from './Components/GeneralAnomalies'
import PastJourneys from './Components/Journeys/PastJourneys'
import Payment from './Components/Payment/Payment'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
          <Route path="/home" element={<AppLayout />}>
            <Route index element={<Map />} />
            <Route path='all-anomalies' element={<GeneralAnomalies/>} />
            <Route path='past-journeys' element={<PastJourneys />} />
          </Route >
          <Route path='/payment' element={<Payment />} /> 
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
