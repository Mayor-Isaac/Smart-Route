import React, { useState, useEffect } from 'react'
import { anomalies } from '../../services/anomalies'
import { journeys } from '../../services/journeys';
import { CgClose } from 'react-icons/cg';

export default function PastJourneys() {
  const [showDetails, setShowDetails] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
    
    // Use the location names from journey data instead of geocoding
    const getLocation = (lat, lng, journey, isOrigin = true) => {
        // First try to get the name from journey data
        if (journey) {
            return isOrigin ? journey.origin.name : journey.destination.name;
        }
        // Fallback to coordinates if no journey data
        return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
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
      <h1 className=" mb-4 text-lg font-medium">Past Journeys</h1>
      <div className="relative w-full">
        <div
          className={`grid-cols-[40px_1fr_1fr_90px_120px_105px] items-center grid  rounded-tl-lg rounded-tr-lg bg-[#004225] font-medium text-[#fff]`}
        >
          {[
            'S/N',
            'Origin',
            'Destination',
            'Anomalies',
            'Time recorded',
            'Action',
          ].map((tab) => (
            <div
              key={tab}
              className="px-[8px] py-[10px] text-[12px] font-medium "
            >
              {tab}
            </div>
          ))}
        </div>

        {journeys.map((journey, index) => {
          const {
            origin: { lat: startLat, lng: startLng },
            destination: { lat: endLat, lng: endLng },
            anomaliesEncountered: anomalies,
            startTime,
          } = journey;
          return (
            <div
              key={index}
              className={`grid grid-cols-[40px_1fr_1fr_90px_120px_105px] border-b  border-gray-200 capitalize`}
            >
              <div className="px-[8px] py-[10px] text-[12px] ">{index + 1}</div>
              <div className="px-[8px] py-[10px] text-[12px] ">
                {getLocation(startLat, startLng)}
              </div>
              <div className="px-[8px] py-[10px] text-[12px] ">
                {getLocation(endLat, endLng)}
              </div>
              <div className="px-[8px] py-[10px] text-[12px] ">
                {anomalies.length}
              </div>
              <div className="px-[8px] py-[10px] text-[12px] font-medium ">
                {formatTimeStamp(startTime)}
              </div>
              <div
                className={`cursor-pointer px-[8px] py-[10px] text-[12px] text-green-600 underline `}
                onClick={() => {
                  setShowDetails(true)
                  setSelectedRowData(journey)
                }}
              >
                View Details
              </div>
            </div>
          );
        })}
      </div>

      {showDetails && <JourneyDetails journey={selectedRowData} closeModal={() => setShowDetails(false)} />}
    </>
  );
}


const JourneyDetails = ({ journey, closeModal }) => {
  console.log("Journey:", journey)
  return (
    <div className="fixed inset-0 z-[500000] flex  items-start justify-end rounded-[4px] bg-black/20 backdrop-blur-sm">
      <div className="max-w-1/2 text-[#004225] h-full w-[500px] bg-white">
        <header className="flex items-center justify-between py-1">
          <CgClose size={20} cursor={"pointer"} onClick={()=> closeModal()}/>
        </header>
      </div>
    </div>
  );
}