import React, { useState, useEffect } from 'react'
import { anomalies } from '../services/anomalies'

export default function GeneralAnomalies() {
    const [locationNames, setLocationNames] = useState({});
    
    // Reverse geocoding to get real location names
    const getLocationName = async (lat, lng) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            
            if (data && data.address) {
                const address = data.address;
                const parts = [];
                
                if (address.road || address.street) parts.push(address.road || address.street);
                if (address.suburb || address.neighbourhood) parts.push(address.suburb || address.neighbourhood);
                if (address.city || address.town) parts.push(address.city || address.town);
                
                return parts.slice(0, 2).join(', ') || data.display_name.split(',')[0];
            }
            return `${lat.toFixed(4)}, ${lng.toFixed(4)}`; // Fallback to coordinates
        } catch (error) {
            return `${lat.toFixed(4)}, ${lng.toFixed(4)}`; // Fallback to coordinates
        }
    };
    
    // Load location names on component mount
    useEffect(() => {
        const loadLocationNames = async () => {
            const names = {};
            for (const anomaly of anomalies) {
                const key = `${anomaly.lat}-${anomaly.lng}`;
                names[key] = await getLocationName(anomaly.lat, anomaly.lng);
            }
            setLocationNames(names);
        };
        loadLocationNames();
    }, []);
    
    const getLocation = (lat, lng) => {
        const key = `${lat}-${lng}`;
        return locationNames[key] || 'Loading...';
    }
    
    const formatTimeStamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }
  return (
    <>
      <h1 className=" font-medium text-lg mb-4">Explore all anomalies recorded</h1>
      <div className="relative w-full">
        <div
          className={`grid grid-cols-[40px_100px_110px_1fr_130px_70px] items-center  rounded-tl-lg rounded-tr-lg bg-[#004225] font-medium text-[#fff]`}
        >
          {[
            'S/N',
            'Location',
            'Anomaly',
            'Description',
            'Time recorded',
            'Status',
          ].map((tab) => (
            <div
              key={tab}
              className="px-[8px] py-[10px] text-[12px] font-medium "
            >
              {tab}
            </div>
          ))}
        </div>

        {anomalies.map((anomaly, index) => (
          <div
            key={index}
            className={`grid grid-cols-[40px_100px_110px_1fr_130px_70px] border-b  border-gray-200 capitalize`}
          >
            <div className="px-[8px] py-[10px] text-[12px] ">{index + 1}</div>
            <div className="px-[8px] py-[10px] text-[12px] ">
              {getLocation(anomaly.lat, anomaly.lng)}
            </div>
            <div className="px-[8px] py-[10px] text-[12px] ">
              {anomaly.anomaly}
            </div>
            <div className="px-[8px] py-[10px] text-[12px] ">
              {anomaly.description}
            </div>
            <div className="px-[8px] py-[10px] text-[12px] font-medium ">
              {formatTimeStamp(anomaly.timestamp)}
            </div>
            <div
              className={`px-[8px] py-[10px] text-[12px] ${
                anomaly.status === 'good'
                  ? 'text-green-500'
                  : anomaly.status === 'warning'
                  ? 'text-yellow-500'
                  : 'text-red-500'
              }`}
            >
              {anomaly.status}
            </div>
          </div>
        ))}
      </div>
    
      </>
  );
}
