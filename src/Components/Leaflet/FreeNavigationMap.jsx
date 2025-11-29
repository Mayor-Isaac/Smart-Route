// components/FreeNavigationMap.jsx
import React, { useState, useEffect, useRef } from 'react';
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
import { anomalies } from '../../services/anomalies';

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
  const mapRef = useRef(null);
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
//   const [anomalies, setAnomalies] = useState([
//     {
//       id: 1,
//       type: 'pothole',
//       severity: 'high',
//       position: [37.7749, -122.4194],
//       description: 'Large pothole on right lane',
//       reportedBy: 'Community User',
//       timestamp: '2 hours ago',
//     },
//     {
//       id: 2,
//       type: 'crack',
//       severity: 'medium',
//       position: [37.783, -122.408],
//       description: 'Multiple cracks across lane',
//       reportedBy: 'City Inspector',
//       timestamp: '1 day ago',
//     },
//     {
//       id: 3,
//       type: 'pothole',
//       severity: 'critical',
//       position: [37.775, -122.425],
//       description: 'Deep pothole - avoid area',
//       reportedBy: 'Driver Report',
//       timestamp: '30 minutes ago',
//     },
//   ]);

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

      if (originArr) {
        setStartPoint(originArr);
        // Move map to show the start point
        if (mapRef.current) {
          mapRef.current.setView(originArr, 13);
        }
      }
      if (destArr) setEndPoint(destArr);

      if (originArr && destArr) {
        getRoute(originArr, destArr);
        // If both points exist, fit bounds to show both
        if (mapRef.current) {
          const bounds = L.latLngBounds([originArr, destArr]);
          mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    };

    window.addEventListener('smartroute:set-points', handler);
    return () => window.removeEventListener('smartroute:set-points', handler);
  }, []);

  const getAnomalyStyles = (status) => {
    const baseStyles =
      'flex items-center justify-center text-white font-bold border-2 border-white rounded-full w-6 h-6 text-xs';

    switch (status) {
      case 'bad':
        return `${baseStyles} bg-red-600`;
      case 'warning':
        return `${baseStyles} bg-yellow-500`;
      case 'good':
        return `${baseStyles} bg-green-500`;
      default:
        return `${baseStyles} bg-gray-500`;
    }
  };

  const getAnomalyIcon = (anomaly) => {
    const type = anomaly.toLowerCase();
    if (type.includes('pothole')) return '🕳️';
    if (type.includes('crack')) return '⚡';
    if (type.includes('bump') || type.includes('speed')) return '⚠️';
    if (type.includes('smooth')) return '✅';
    if (type.includes('erosion')) return '🌊';
    return '🛣️';
  };

  // Create custom colored marker icons
  const createColoredIcon = (status) => {
    const color = status === 'bad' ? '#DC2626' : status === 'warning' ? '#EAB308' : '#16A34A';
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5" fill="white"/>
      </svg>
    `;
    return new L.Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(svgIcon)}`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  };

  // Map status to severity for consistent coloring
  const getStatusSeverity = (status) => {
    switch (status) {
      case 'bad': return 'critical';
      case 'warning': return 'medium';
      case 'good': return 'low';
      default: return 'medium';
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
    
    const clearRoute = () => {
      setStartPoint(null);
      setEndPoint(null);
      setRoute(null);
    };

  return (
    <div className="relative h-screen w-full">
      <MapContainer
        center={isValidLatLng(startPoint) ? startPoint : [37.7749, -122.4194]}
        zoom={13}
        className="h-full w-full"
        ref={mapRef}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
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
        {route &&
          route.geometry &&
          Array.isArray(route.geometry.coordinates) && (
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
        {anomalies.map((anomaly, i) => (
          <Marker 
            key={i} 
            position={[anomaly.lat, anomaly.lng]}
            icon={createColoredIcon(anomaly.status)}
          >
            <Popup>
              <div className="min-w-[200px]">
                <div
                  className={`mb-2 flex items-center gap-2 rounded p-2 ${
                    anomaly.status === 'bad'
                      ? 'border-l-4 border-red-500 bg-red-100'
                      : anomaly.status === 'warning'
                      ? 'border-l-4 border-yellow-500 bg-yellow-100'
                      : 'border-l-4 border-green-500 bg-green-100'
                  }`}
                >
                  <span className="text-lg">
                    {getAnomalyIcon(anomaly.anomaly)}
                  </span>
                  <div>
                    <div className="font-semibold capitalize">
                      {anomaly.anomaly}
                    </div>
                    <div className="text-sm capitalize text-gray-600">
                      {anomaly.status}
                    </div>
                  </div>
                </div>
                <p className="mb-2 text-sm text-gray-700">
                  {anomaly.description}
                </p>
                <div className="border-t pt-2 text-xs text-gray-500">
                  <div>Status: {anomaly.status}</div>
                  <div>{new Date(anomaly.timestamp).toLocaleDateString()}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Control Panel */}
      <div className="absolute right-4 top-4 z-[1000] flex max-w-[1/3] items-center gap-2 rounded-lg bg-white p-2 text-[12px] shadow-xl">
              {!endPoint &&
                  <p>Select the current location and the destination in the menu.</p>
              }
          {startPoint&&endPoint && <button
            onClick={clearRoute}
            className="rounded bg-gray-500 px-1 py-0.5 text-white transition-colors hover:bg-gray-600"
          >
            Clear Route
          </button>}
       
      </div>
      

      {/* Directions Panel */}
      <FreeDirectionsPanel route={route} anomalies={anomalies} />
    </div>
  );
};

export default FreeNavigationMap;
