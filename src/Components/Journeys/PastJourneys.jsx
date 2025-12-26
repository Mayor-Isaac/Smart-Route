import React, { useState, useEffect } from 'react'
import { anomalies } from '../../services/anomalies'
import { journeys } from '../../services/journeys';
import useFetch from "../../utils/useFetch"
import { CgClose } from 'react-icons/cg';
import { getAnomalies } from '../../services/apis';

export default function PastJourneys() {
  const [showDetails, setShowDetails] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [locationNames, setLocationNames] = useState({})

  const { data } = useFetch(
    {queryFn: () => getAnomalies(),
    key: 'pastJourneys',}
  )

  console.log("Fetched anomalies data:", data)
    
    // Use geocoding to get location names from coordinates
    const getLocationName = async (lat, lng) => {
        const key = `${lat},${lng}`;
        if (locationNames[key]) {
            return locationNames[key];
        }
        
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            const displayName = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            
            // Extract meaningful location name (first part before first comma)
            const locationName = displayName.split(',')[0] || displayName;
            
            setLocationNames(prev => ({
                ...prev,
                [key]: locationName
            }));
            
            return locationName;
        } catch (error) {
            console.error('Error fetching location name:', error);
            return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        }
    }
    
    // Pre-load location names when component mounts
    useEffect(() => {
        const loadLocationNames = async () => {
            const promises = [];
            journeys.forEach(journey => {
                promises.push(getLocationName(journey.origin.lat, journey.origin.lng));
                promises.push(getLocationName(journey.destination.lat, journey.destination.lng));
            });
            await Promise.all(promises);
        };
        
        loadLocationNames();
    }, []);
    
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
          className={`grid grid-cols-[40px_1fr_1fr_90px_120px_105px] items-center  rounded-tl-lg rounded-tr-lg bg-[#004225] font-medium text-[#fff]`}
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
                {locationNames[`${journey.origin.lat},${journey.origin.lng}`] ||
                  `${journey.origin.lat.toFixed(
                    4
                  )}, ${journey.origin.lng.toFixed(4)}`}
              </div>
              <div className="px-[8px] py-[10px] text-[12px] ">
                {locationNames[
                  `${journey.destination.lat},${journey.destination.lng}`
                ] ||
                  `${journey.destination.lat.toFixed(
                    4
                  )}, ${journey.destination.lng.toFixed(4)}`}
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
                  setShowDetails(true);
                  setSelectedRowData(journey);
                }}
              >
                View Details
              </div>
            </div>
          );
        })}
      </div>

      {showDetails && (
        <JourneyDetails
          journey={selectedRowData}
          closeModal={() => setShowDetails(false)}
          formatTimeStamp={formatTimeStamp}
        />
      )}
    </>
  );
}


const JourneyDetails = ({ journey, closeModal, formatTimeStamp }) => {
  const [originName, setOriginName] = useState('')
  const [destinationName, setDestinationName] = useState('')

  // Fetch location names when component mounts
  useEffect(() => {
    const fetchLocationNames = async () => {
      try {
        // Get origin name
        const originResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${journey.origin.lat}&lon=${journey.origin.lng}`);
        const originData = await originResponse.json();
        const originDisplayName = originData.display_name || `${journey.origin.lat.toFixed(4)}, ${journey.origin.lng.toFixed(4)}`;
        setOriginName(originDisplayName.split(',')[0] || originDisplayName);

        // Get destination name
        const destResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${journey.destination.lat}&lon=${journey.destination.lng}`);
        const destData = await destResponse.json();
        const destDisplayName = destData.display_name || `${journey.destination.lat.toFixed(4)}, ${journey.destination.lng.toFixed(4)}`;
        setDestinationName(destDisplayName.split(',')[0] || destDisplayName);
      } catch (error) {
        console.error('Error fetching location names:', error);
        setOriginName(`${journey.origin.lat.toFixed(4)}, ${journey.origin.lng.toFixed(4)}`);
        setDestinationName(`${journey.destination.lat.toFixed(4)}, ${journey.destination.lng.toFixed(4)}`);
      }
    };

    fetchLocationNames();
  }, [journey]);

  console.log("Journey:", journey)
  return (
    <div className="fixed inset-0 z-[500000] flex  items-start justify-end rounded-[4px] bg-black/20 backdrop-blur-sm">
      <div className="max-w-1/2 h-full w-[600px] bg-white px-4 text-[#004225]">
        <header className="flex items-center justify-between py-4">
          <h2 className=" text-lg font-medium">Journey Details</h2>
          <CgClose size={20} cursor={'pointer'} onClick={() => closeModal()} />
        </header>

        <main className="flex flex-col gap-3">
          {/* Info Start and Destination */}
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="">
                Start Location:
                <strong> {originName || `${journey.origin.lat},${journey.origin.lng}`}</strong>
              </div>

              <div className="">
                Start Time:
                <strong>{formatTimeStamp(journey.startTime) || ''}</strong>
              </div>
            </div>

            <div className="flex-1">
              <div className="">
                Destination:{' '}
                <strong>
                  {destinationName || `${journey.destination.lat},${journey.destination.lng}`}
                </strong>
              </div>

              <div className="">
                End Time:{' '}
                <strong>{formatTimeStamp(journey.endTime) || ''}</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-1">
              <p>Distance:</p>
              <strong>{journey.distance}km</strong>
            </div>
            <div className="flex flex-1 items-center gap-1">
              <p>Duration:</p>
              <strong>{journey.duration} mins.</strong>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-1">
              <p>Maximum Speed:</p>
              <strong>{journey.maxSpeed}km/h</strong>
            </div>
            <div className="flex flex-1 items-center gap-1">
              <p>Average Speed:</p>
              <strong>{journey.averageSpeed}km/h</strong>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-1">
              <p>Weather:</p>
              <strong className="capitalize">{journey.weatherCondition}</strong>
            </div>
            <div className="flex flex-1 items-center gap-1">
              <p>Carbon Emission:</p>
              <strong className="capitalize">{journey.carbonEmission}kg</strong>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-1">
              <p>Vehicle Type:</p>
              <strong className="capitalize">{journey.vehicleType}</strong>
            </div>
            <div className="flex flex-1 items-center gap-1">
              <p>Traffic Level:</p>
              <strong className="capitalize">{journey.trafficLevel}</strong>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-1">
              <p>Status:</p>
              <strong className="capitalize">{journey.status} </strong>
            </div>

            <div className="flex flex-1 items-center gap-1">
              <p>Rating:</p>
              <strong className="capitalize">{journey.rating}/5 </strong>
            </div>
          </div>

          {/* Table */}
          <>
            <h3 className="text-md mt-4 font-medium">
              {journey.anomaliesEncountered.length <= 1
                ? 'Anomaly'
                : 'Anomalies'}{' '}
              Encountered
            </h3>
            {journey.anomaliesEncountered.length === 0 ? (
              <p>No anomalies encountered during this journey.</p>
            ) : (
              <div className="relative w-full">
                <div
                  className={`grid grid-cols-[40px_110px_90px_1fr_120px] items-center  rounded-tl-lg rounded-tr-lg bg-[#004225] font-medium text-[#fff]`}
                >
                  {['S/N', 'Type', 'Severity', 'Location', 'Time recorded'].map(
                    (tab) => (
                      <div
                        key={tab}
                        className="px-[8px] py-[10px] text-[12px] font-medium "
                      >
                        {tab}
                      </div>
                    )
                  )}
                </div>

                {journey.anomaliesEncountered.map((anomaly, index) => {
                  return (
                    <div
                      key={index}
                      className={`grid grid-cols-[40px_110px_90px_1fr_120px] border-b  border-gray-200 capitalize`}
                    >
                      <div className="px-[8px] py-[10px] text-[12px] ">
                        {index + 1}
                      </div>
                      <div className="px-[8px] py-[10px] text-[12px] ">
                        {anomaly.type}
                      </div>
                      <div className="px-[8px] py-[10px] text-[12px] ">
                        {anomaly.severity}
                      </div>
                      <div className="px-[8px] py-[10px] text-[12px] ">
                        {anomaly.location}
                      </div>
                      <div className="px-[8px] py-[10px] text-[12px] font-medium ">
                        {formatTimeStamp(anomaly.timestamp)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        </main>
      </div>
    </div>
  );
}