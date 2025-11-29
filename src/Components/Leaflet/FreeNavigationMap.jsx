// components/FreeNavigationMap.jsx
import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import FreeDirectionsPanel from './FreeDirectionsPanel';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const FreeNavigationMap = () => {
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [route, setRoute] = useState(null);
    // On mount: attempt to set startPoint to the user's current location and center the map
    useEffect(() => {
      if (!('geolocation' in navigator)) return;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const current = [latitude, longitude];
          setStartPoint(current);
          // Also emit to any listeners (optional coherence with sidebar event flow)
          window.dispatchEvent(
            new CustomEvent('smartroute:set-points', {
              detail: { origin: { lat: latitude, lng: longitude }, destination: null },
            })
          );
        },
        () => {
          // silently ignore errors; map will use default center
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    }, []);
  const [anomalies, setAnomalies] = useState([
    {
      id: 1,
      type: 'pothole',
      severity: 'high',
      position: [37.7749, -122.4194],
      description: 'Large pothole on right lane',
      reportedBy: 'Community User',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      type: 'crack',
      severity: 'medium',
      position: [37.783, -122.408],
      description: 'Multiple cracks across lane',
      reportedBy: 'City Inspector',
      timestamp: '1 day ago',
    },
    {
      id: 3,
      type: 'pothole',
      severity: 'critical',
      position: [37.775, -122.425],
      description: 'Deep pothole - avoid area',
      reportedBy: 'Driver Report',
      timestamp: '30 minutes ago',
    },
  ]);

  const getRoute = async (start, end) => {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson&steps=true`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const routeData = {
          geometry: data.routes[0].geometry,
          distance: data.routes[0].distance,
          duration: data.routes[0].duration,
          steps: data.routes[0].legs[0]?.steps || [],
        };
        setRoute(routeData);
        return routeData;
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  // Listen for coordinates coming from the sidebar via a custom event
  React.useEffect(() => {
    const handler = (ev) => {
      const detail = ev.detail || {};
      const origin = detail.origin;
      const destination = detail.destination;

      // origin/destination can be { lat, lng } arrays or objects
      const toLatLngArray = (val) => {
        if (!val) return null;
        if (Array.isArray(val) && val.length === 2) {
          const lat = Number(val[0]);
          const lng = Number(val[1]);
          if (Number.isFinite(lat) && Number.isFinite(lng)) return [lat, lng];
          return null;
        }
        if (val && typeof val === 'object' && 'lat' in val && 'lng' in val) {
          const lat = Number(val.lat);
          const lng = Number(val.lng);
          if (Number.isFinite(lat) && Number.isFinite(lng)) return [lat, lng];
          return null;
        }
        return null;
      };

      const originArr = toLatLngArray(origin);
      const destArr = toLatLngArray(destination);

      if (originArr) setStartPoint(originArr);
      if (destArr) setEndPoint(destArr);

      if (originArr && destArr) {
        getRoute(originArr, destArr);
      }
    };

    window.addEventListener('smartroute:set-points', handler);
    return () => window.removeEventListener('smartroute:set-points', handler);
  }, []);

  const getAnomalyStyles = (severity) => {
    const baseStyles =
      'flex items-center justify-center text-white font-bold border-2 border-white rounded-full w-6 h-6 text-xs';

    switch (severity) {
      case 'critical':
        return `${baseStyles} bg-red-600`;
      case 'high':
        return `${baseStyles} bg-orange-500`;
      case 'medium':
        return `${baseStyles} bg-yellow-500`;
      case 'low':
        return `${baseStyles} bg-green-500`;
      default:
        return `${baseStyles} bg-gray-500`;
    }
  };

  const getAnomalyIcon = (type) => {
    switch (type) {
      case 'pothole':
        return '🕳️';
      case 'crack':
        return '⚡';
      case 'bump':
        return '📈';
      default:
        return '⚠️';
    }
    };

  // Validate [lat, lng] arrays to avoid null/NaN usage
  const isValidLatLng = (arr) => {
    return (
      Array.isArray(arr) &&
      arr.length === 2 &&
      Number.isFinite(Number(arr[0])) &&
      Number.isFinite(Number(arr[1]))
    );
  };

  return (
    <div className="relative h-screen w-full">
      <MapContainer
        center={
          isValidLatLng(startPoint)
            ? startPoint
            : [37.7749, -122.4194]
        }
        zoom={13}
        className="h-full w-full"
        // Map clicks disabled; points come from Sidebar via event
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Start Marker */}
        {isValidLatLng(startPoint) && <Marker position={startPoint}></Marker>}

        {/* End Marker */}
        {isValidLatLng(endPoint) && <Marker position={endPoint}></Marker>}

        {/* Route Line */}
        {route && route.geometry && Array.isArray(route.geometry.coordinates) && (
          <Polyline
            positions={route.geometry.coordinates.map((coord) => [
              coord[1],
              coord[0],
            ])}
            color="#3b82f6"
            weight={6}
            opacity={0.7}
          />
        )}

        {/* Anomaly Markers */}
        {anomalies.map((anomaly) => (
          <Marker
            key={anomaly.id}
            position={anomaly.position}
            icon={L.divIcon({
              html: `<div class="${getAnomalyStyles(
                anomaly.severity
              )}">${getAnomalyIcon(anomaly.type)}</div>`,
              className: 'anomaly-marker',
              iconSize: [24, 24],
            })}
          >
            <Popup>
              <div className="min-w-[200px]">
                <div
                  className={`mb-2 flex items-center gap-2 rounded p-2 ${
                    anomaly.severity === 'critical'
                      ? 'border-l-4 border-red-500 bg-red-100'
                      : anomaly.severity === 'high'
                      ? 'border-l-4 border-orange-500 bg-orange-100'
                      : anomaly.severity === 'medium'
                      ? 'border-l-4 border-yellow-500 bg-yellow-100'
                      : 'border-l-4 border-green-500 bg-green-100'
                  }`}
                >
                  <span className="text-lg">
                    {getAnomalyIcon(anomaly.type)}
                  </span>
                  <div>
                    <div className="font-semibold capitalize">
                      {anomaly.type}
                    </div>
                    <div className="text-sm capitalize text-gray-600">
                      {anomaly.severity} severity
                    </div>
                  </div>
                </div>
                <p className="mb-2 text-sm text-gray-700">
                  {anomaly.description}
                </p>
                <div className="border-t pt-2 text-xs text-gray-500">
                  <div>Reported by: {anomaly.reportedBy}</div>
                  <div>{anomaly.timestamp}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Control Panel */}
      <div className="absolute right-4 top-4 z-[1000] rounded-lg bg-white p-2 text-[12px] shadow-xl">
              {!startPoint && !endPoint ? <p>Select the current location and the destination in the menu.</p>: <p>Enjoy your trip</p>}
      </div>
      {/* <div className="absolute left-4 top-4 z-[1000] max-w-xs rounded-lg bg-white p-4 shadow-xl">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
            <span className="font-bold text-white">🛣️</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">RoadSafe Navigator</h3>
            <p className="text-xs text-gray-600">Free & Open Source</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Start Point:</span>
            <span
              className={
                startPoint ? 'font-medium text-green-600' : 'text-gray-400'
              }
            >
              {startPoint ? 'Set ✓' : 'Not set'}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">End Point:</span>
            <span
              className={
                endPoint ? 'font-medium text-green-600' : 'text-gray-400'
              }
            >
              {endPoint ? 'Set ✓' : 'Not set'}
            </span>
          </div>

          {route && (
            <div className="rounded border border-green-200 bg-green-50 p-2">
              <div className="text-sm font-medium text-green-800">
                Route calculated!
              </div>
              <div className="text-xs text-green-600">
                {(route.distance / 1000).toFixed(1)} km •{' '}
                {Math.round(route.duration / 60)} min
              </div>
            </div>
          )}

          <div className="rounded bg-gray-50 p-2 text-xs text-gray-500">
            💡 Click map to set points: Start → End
          </div>

          {(startPoint || endPoint) && (
            <button
              onClick={clearRoute}
              className="w-full rounded bg-gray-500 px-3 py-2 text-sm text-white transition-colors hover:bg-gray-600"
            >
              Clear Route
            </button>
          )}
        </div>
      </div> */}

      {/* Directions Panel */}
      <FreeDirectionsPanel route={route} anomalies={anomalies} />
    </div>
  );
};

export default FreeNavigationMap;
