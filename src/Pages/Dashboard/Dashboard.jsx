import React, { useState, useEffect } from 'react'
import { anomalies } from '../../services/anomalies'
import { journeys } from '../../services/journeys'
import { FaExclamationTriangle, FaRoute, FaMapMarkerAlt, FaCheckCircle, FaBell, FaCloudSun, FaVolumeUp, FaMapPin } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../../Components/Tracking/LiveTracking'
import voiceNavigation from '../../services/voiceNavigation'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalAnomalies: 0,
    totalJourneys: 0,
    criticalAnomalies: 0,
    smoothRoads: 0
  })

  useEffect(() => {
    // Calculate statistics
    const totalAnomalies = anomalies.length
    const totalJourneys = journeys.length
    const criticalAnomalies = anomalies.filter(a => a.status === 'bad').length
    const smoothRoads = anomalies.filter(a => a.status === 'good').length

    setStats({
      totalAnomalies,
      totalJourneys,
      criticalAnomalies,
      smoothRoads
    })
  }, [])

  const recentAnomalies = anomalies.slice(0, 5)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Road Anomaly Detection Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Anomalies</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.totalAnomalies}</h3>
            </div>
            <FaExclamationTriangle className="text-4xl text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Critical Issues</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.criticalAnomalies}</h3>
            </div>
            <FaExclamationTriangle className="text-4xl text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Smooth Roads</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.smoothRoads}</h3>
            </div>
            <FaCheckCircle className="text-4xl text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Journeys</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.totalJourneys}</h3>
            </div>
            <FaRoute className="text-4xl text-purple-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => navigate('/home/map')}
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-6 shadow-md transition-all"
        >
          <FaMapMarkerAlt className="text-3xl mb-2 mx-auto" />
          <h3 className="font-bold text-lg">View Map</h3>
          <p className="text-sm mt-2">Navigate and detect anomalies</p>
        </button>

        <button
          onClick={() => navigate('/home/all-anomalies')}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-6 shadow-md transition-all"
        >
          <FaExclamationTriangle className="text-3xl mb-2 mx-auto" />
          <h3 className="font-bold text-lg">View All Anomalies</h3>
          <p className="text-sm mt-2">See complete anomaly list</p>
        </button>

        <button
          onClick={() => navigate('/home/past-journeys')}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-6 shadow-md transition-all"
        >
          <FaRoute className="text-3xl mb-2 mx-auto" />
          <h3 className="font-bold text-lg">Past Journeys</h3>
          <p className="text-sm mt-2">Review journey history</p>
        </button>
      </div>

      {/* New Features Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🆕 New Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => {
              toast.info('Tap SOS Alert 3 times quickly in sidebar for emergency', {
                duration: 4000,
                icon: '🚨',
              });
            }}
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-4 shadow-md transition-all text-left"
          >
            <FaBell className="text-2xl mb-2" />
            <h4 className="font-bold">Emergency SOS</h4>
            <p className="text-xs mt-1 opacity-90">Quick emergency alert</p>
          </button>

          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('smartroute:toggle-weather'));
              toast.success('Weather overlay toggled on map');
            }}
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-lg p-4 shadow-md transition-all text-left"
          >
            <FaCloudSun className="text-2xl mb-2" />
            <h4 className="font-bold">Weather Data</h4>
            <p className="text-xs mt-1 opacity-90">Satellite weather info</p>
          </button>

          <button
            onClick={() => {
              const enabled = voiceNavigation.isEnabled();
              if (enabled) {
                voiceNavigation.disable();
                toast.success('Voice navigation disabled', { icon: '🔇' });
              } else {
                voiceNavigation.enable();
                voiceNavigation.test();
                toast.success('Voice navigation enabled', { icon: '🔊' });
              }
            }}
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg p-4 shadow-md transition-all text-left"
          >
            <FaVolumeUp className="text-2xl mb-2" />
            <h4 className="font-bold">Voice Navigation</h4>
            <p className="text-xs mt-1 opacity-90">Turn-by-turn guidance</p>
          </button>

          <div className="bg-orange-500 text-white rounded-lg p-4 shadow-md text-left">
            <FaMapPin className="text-2xl mb-2" />
            <h4 className="font-bold">Live Tracking</h4>
            <p className="text-xs mt-1 opacity-90">Share your location</p>
          </div>
        </div>
      </div>

      {/* Live Tracking Component */}
      <div className="mb-8">
        <LiveTracking />
      </div>

      {/* Recent Anomalies */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Anomalies</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Type</th>
                <th className="text-left py-2 px-4">Status</th>
                <th className="text-left py-2 px-4">Location</th>
                <th className="text-left py-2 px-4">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentAnomalies.map((anomaly, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 capitalize">{anomaly.anomaly}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      anomaly.status === 'bad' ? 'bg-red-100 text-red-800' :
                      anomaly.status === 'good' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {anomaly.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">{anomaly.lat.toFixed(4)}, {anomaly.lng.toFixed(4)}</td>
                  <td className="py-3 px-4 text-sm">
                    {new Date(anomaly.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={() => navigate('/home/all-anomalies')}
          className="mt-4 text-green-600 hover:text-green-700 font-semibold text-sm"
        >
          View All →
        </button>
      </div>
    </div>
  )
}
