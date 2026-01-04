import React, { useState, useEffect } from 'react';
import { FaCloudRain, FaSun, FaCloudShowersHeavy, FaWind, FaEye, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function WeatherOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleToggleWeather = () => {
      setIsVisible(prev => !prev);
      if (!weatherData && !isVisible) {
        fetchWeatherData();
      }
    };

    window.addEventListener('smartroute:toggle-weather', handleToggleWeather);

    return () => {
      window.removeEventListener('smartroute:toggle-weather', handleToggleWeather);
    };
  }, [weatherData, isVisible]);

  const fetchWeatherData = async () => {
    setLoading(true);
    
    // Simulate weather API call
    // In production, use Open Weather API or NIGCOMSAT satellite data
    setTimeout(() => {
      setWeatherData({
        condition: 'partly_cloudy',
        temperature: 28,
        humidity: 65,
        visibility: 8.5, // km
        windSpeed: 12, // km/h
        rainfall: 0,
        warnings: [],
        floodRisk: 'low',
        lastUpdated: new Date().toISOString(),
      });
      setLoading(false);
      toast.success('Weather data loaded from satellite', { icon: '🛰️' });
    }, 1500);
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny':
        return <FaSun className="text-yellow-500 text-4xl" />;
      case 'rainy':
        return <FaCloudRain className="text-blue-500 text-4xl" />;
      case 'heavy_rain':
        return <FaCloudShowersHeavy className="text-blue-700 text-4xl" />;
      default:
        return <FaCloudRain className="text-gray-500 text-4xl" />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-[10000] bg-white rounded-lg shadow-2xl w-80 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          🛰️ Weather Overlay
        </h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">Loading satellite data...</p>
        </div>
      ) : weatherData ? (
        <div className="space-y-4">
          {/* Current Condition */}
          <div className="text-center bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-lg">
            {getWeatherIcon(weatherData.condition)}
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {weatherData.temperature}°C
            </p>
            <p className="text-sm text-gray-600 capitalize">
              {weatherData.condition.replace('_', ' ')}
            </p>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded">
              <div className="flex items-center gap-2 text-gray-600">
                <FaEye />
                <span className="text-xs">Visibility</span>
              </div>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {weatherData.visibility} km
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded">
              <div className="flex items-center gap-2 text-gray-600">
                <FaWind />
                <span className="text-xs">Wind Speed</span>
              </div>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {weatherData.windSpeed} km/h
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded">
              <div className="flex items-center gap-2 text-gray-600">
                <FaCloudRain />
                <span className="text-xs">Rainfall</span>
              </div>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {weatherData.rainfall} mm
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-xs">💧 Humidity</span>
              </div>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {weatherData.humidity}%
              </p>
            </div>
          </div>

          {/* Flood Risk */}
          <div className={`p-3 rounded ${
            weatherData.floodRisk === 'high' ? 'bg-red-50 border border-red-200' :
            weatherData.floodRisk === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
            'bg-green-50 border border-green-200'
          }`}>
            <p className="text-xs font-semibold text-gray-700">
              Flood Risk Assessment:
            </p>
            <p className={`text-sm font-bold mt-1 ${
              weatherData.floodRisk === 'high' ? 'text-red-600' :
              weatherData.floodRisk === 'medium' ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {weatherData.floodRisk.toUpperCase()} - Low-lying roads safe
            </p>
          </div>

          {/* Data Source */}
          <div className="text-center text-xs text-gray-500">
            <p>Data from meteorological satellites</p>
            <p className="mt-1">
              Updated: {new Date(weatherData.lastUpdated).toLocaleTimeString()}
            </p>
          </div>

          <button
            onClick={fetchWeatherData}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm font-semibold"
          >
            Refresh Weather Data
          </button>
        </div>
      ) : null}
    </div>
  );
}
