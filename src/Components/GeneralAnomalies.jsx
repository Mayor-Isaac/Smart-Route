import React from 'react'
import { anomalies } from '../services/anomalies'

export default function GeneralAnomalies() {
    const getLocation = (lat, lng) => {

    }
    const formatTimeStamp = (timestamp) => {

    }
  return (
            <div className="relative w-full">
          <div className={`grid grid-cols-[40px_100px_110px_1fr_130px_70px] items-center  bg-[#E8EFF9]  rounded-tr-lg rounded-tl-lg`}>
          {["S/N", "Location", "Anomaly", "Description", "Time recorded", "Status"].map(tab => <div key={tab} className="py-[10px] px-[8px] text-[12px] font-medium text-[#292929]">{tab}</div>)}
          </div>
          
          {anomalies.map((anomaly, index) => (
            <div key={index} className={`grid grid-cols-[40px_100px_110px_1fr_130px_70px] capitalize  border-b border-gray-200`}>
              <div className="py-[10px] px-[8px] text-[12px] text-[#292929]">{index+1}</div>
              <div className="py-[10px] px-[8px] text-[12px] text-[#292929]">{getLocation(anomaly.lat, anomaly.lng)}</div>
              <div className="py-[10px] px-[8px] text-[12px] text-[#292929]">{anomaly.anomaly}</div>
              <div className="py-[10px] px-[8px] text-[12px] text-[#292929]">{anomaly.description}</div>
              <div className="py-[10px] px-[8px] text-[12px] text-[#292929]">{formatTimeStamp(anomaly.timestamp)}</div>
              <div className="py-[10px] px-[8px] text-[12px] text-[#292929]">{anomaly.status}</div>
            </div>
          ))}
        </div >
  )
}
