import React, { useState, useEffect } from 'react'
import { anomalies } from '../services/anomalies'
import useFetch from '../utils/useFetch';
import useAlter from '../utils/useAlter';
import { createAnomaly, createJourney, getAnomalies } from '../services/apis';
import toast from 'react-hot-toast';

export default function GeneralAnomalies() {
    const [locationNames, setLocationNames] = useState({});

  
  // const { data, isPending, error } = useFetch({
  //   key: ['anomalies'],
  //   queryFn: () => getAnomalies(),
  // })


   const createJourneyMutation = useAlter({
     mutationFn: createJourney,
     key: 'journey',
     onSuccessCallback: () => {
       toast.success('Journey initiated successfully!', { duration: 5000 });
     },
     onErrorCallback: (error) => {
       console.error('Failed to initiate journey:', error);
       toast.error(`Failed to initiate journey. ${error.message}`, {
         duration: 8000,
       });
     },
   });
   const createAnomalyMutation = useAlter({
     mutationFn: createAnomaly,
     key: 'anomaly',
     onSuccessCallback: () => {
       toast.success('Anomaly reported successfully!', { duration: 5000 });
     },
     onErrorCallback: (error) => {
       console.error('Failed to report anomaly:', error);
       toast.error(`Failed to report anomaly. ${error.message}`, {
         duration: 8000,
       });
     },
   });
  
  const testData1 = {
    destination: {
      latitude: 0,
      location_name: 'string',
      longitude: 0,
    },
    distance_km: 10.5,
    end_time: '2024-01-01T01:00:00Z',
    id: 'string',
    origin: {
      latitude: 0,
      location_name: 'string',
      longitude: 0,
    },
    start_time: '2024-01-01T00:00:00Z',
    status: 'ONGOING',
  };

   const confirmCreateJourney = (leadCode) => {
     createJourneyMutation.mutate(testData1);
  };

  const testData2 = {
    journey_id: 'string',
    location: {
      longitude: 0,
      latitude: 0,
      location_name: 'Idyllic Junction',
    },
    description: 'Flat tire at location X',
    timestamp: '2026-01-23T10:08:34.030Z',
    status: 'REPORTED',
  };

   const confirmCreateAnomaly = (leadCode) => {
     createAnomalyMutation.mutate(testData2);
  };
  


  // console.log('Anomalies Data ===>', data);

  
    
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
      <h1
        className=" mb-4 text-lg font-medium"
        onClick={() => confirmCreateJourney()}
      >
        Explore all anomalies recorded
      </h1>
      <div className="relative w-full">
        <div onClick={()=> confirmCreateAnomaly()}
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
