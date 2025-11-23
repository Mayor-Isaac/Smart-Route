import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import Map from './Pages/Map/Map'
import AppLayout from './AppLayout'
import Home from './Pages/Home/Home'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
          {/* <Route path="/" element={<AppLayout />}> */}
            <Route path="map" element={<Map />} />
          {/* </Route > */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}
