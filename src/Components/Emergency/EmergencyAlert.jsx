import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function EmergencyAlert() {
  const [emergencyData, setEmergencyData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleEmergency = (event) => {
      const { location, timestamp, type } = event.detail;
      setEmergencyData({ location, timestamp, type });
      setIsVisible(true);

      // Simulate sending notification to nearby users and authorities
      setTimeout(() => {
        toast.success('Emergency notification sent to nearby users within 10km radius', {
          duration: 5000,
          icon: '📢',
        });
      }, 1000);

      setTimeout(() => {
        toast.success('Police stations in the district have been notified', {
          duration: 5000,
          icon: '🚔',
        });
      }, 2000);
    };

    window.addEventListener('smartroute:emergency', handleEmergency);

    return () => {
      window.removeEventListener('smartroute:emergency', handleEmergency);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setEmergencyData(null);
  };

  if (!isVisible || !emergencyData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100000] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative animate-pulse">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-red-100 rounded-full p-4">
              <FaExclamationTriangle className="text-red-600 text-5xl" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-red-600 mb-2">
            EMERGENCY SOS ACTIVATED
          </h2>

          <div className="text-left mt-6 space-y-3">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm font-semibold text-gray-700">Location:</p>
              <p className="text-sm text-gray-600">
                {emergencyData.location.lat.toFixed(6)}, {emergencyData.location.lng.toFixed(6)}
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm font-semibold text-gray-700">Time:</p>
              <p className="text-sm text-gray-600">
                {new Date(emergencyData.timestamp).toLocaleString()}
              </p>
            </div>

            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-sm font-semibold text-red-700">Actions Taken:</p>
              <ul className="text-sm text-red-600 mt-2 space-y-1">
                <li>✓ Notifying users within 10km radius</li>
                <li>✓ Alerting police stations in district</li>
                <li>✓ Broadcasting emergency signal</li>
                <li>✓ Sharing live location</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Stay calm. Help is on the way.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-semibold"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
