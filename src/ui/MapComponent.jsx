import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dayjs from 'dayjs';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const getCustomIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const roadData = [
  {
    lat: 7.312,
    lng: 5.1355,
    anomaly: 'pothole',
    status: 'bad',
    timestamp: '2025-05-12T09:00:00Z',
    description:
      'Large pothole near the FUTA North Gate intersection. Needs urgent repair.',
  },
  {
    lat: 7.3122,
    lng: 5.1358,
    anomaly: 'cracked surface',
    status: 'bad',
    timestamp: '2025-05-12T09:05:00Z',
    description:
      'Visible cracks along Obanla Road causing discomfort. Commonly busy during the day.',
  },
  {
    lat: 7.313,
    lng: 5.1362,
    anomaly: 'smooth road',
    status: 'good',
    timestamp: '2025-05-12T09:10:00Z',
    description:
      'Smooth road surface near FUTA Senate building. No anomalies detected.',
  },
  {
    lat: 7.314,
    lng: 5.137,
    anomaly: 'speed bump',
    status: 'warning',
    timestamp: '2025-05-12T09:15:00Z',
    description:
      'Unpainted speed bump just before Hilltop junction. Might be hard to notice at night.',
  },
  {
    lat: 7.3145,
    lng: 5.1375,
    anomaly: 'smooth road',
    status: 'good',
    timestamp: '2025-05-12T09:20:00Z',
    description:
      'Clean and smooth road stretch near the Students’ Union Building.',
  },
  {
    lat: 7.315,
    lng: 5.138,
    anomaly: 'pothole',
    status: 'bad',
    timestamp: '2025-05-12T09:25:00Z',
    description:
      'Deep pothole close to the rear gate exit. May cause tire damage.',
  },
  {
    lat: 7.3109,
    lng: 5.1341,
    anomaly: 'speed bump',
    status: 'warning',
    timestamp: '2025-05-12T08:55:00Z',
    description: 'Minor Errosion patches near Hilltop, FUTA',
  },
  {
    lat: 7.3094,
    lng: 5.1405,
    anomaly: 'smooth road',
    status: 'good',
    timestamp: '2025-05-12T08:35:00Z',
    description: 'Freshly tarred lanes along Alumni Junction.',
  },
  {
    lat: 7.3099,
    lng: 5.1388,
    anomaly: 'pothole',
    status: 'bad',
    timestamp: '2025-05-12T08:45:00Z',
    description: 'Flood-prone zone and potholes beside Obafemi Awolowo Hall.',
  },
  {
    lat: 7.3101,
    lng: 5.1372,
    anomaly: 'Speed bumps and cracks',
    status: 'warning',
    timestamp: '2025-05-12T08:25:00Z',
    description: 'Minor cracks and occasional bumps near Lecture Theatre.',
  },
];

// function CustomZoomControl() {
//   const map = useMap();
//   useEffect(() => {
//     L.control.zoom({ position: 'topright' }), [map];
//   });
//   L.control.zoom({ position: 'topright' }).addTo(Map);
//   return null;
// }
const MapComponent = () => {
  const { lat, lng } = roadData[0];
  return (
    <MapContainer
      // center={[7.25, 5.2]}
      center={[lat, lng]}
      zoom={7}
      style={{ height: '90vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; SmartRout Co."
      />
      {/* <CustomZoomControl /> */}
      {roadData.map((road, index) => (
        <Marker
          key={index}
          position={[road.lat, road.lng]}
          icon={getCustomIcon(
            road.status === 'bad'
              ? 'red'
              : road.status === 'good'
              ? 'green'
              : 'yellow'
          )}
        >
          <Popup className={`pop-up-${road.status}`}>
            <div>
              <strong className="font-bold">Status:</strong>{' '}
              <span
                className={` font-medium  ${
                  road.status === 'bad'
                    ? 'text-red-500'
                    : road.status === 'good'
                    ? 'text-green-500'
                    : 'text-yellow-500'
                }`}
              >
                {road.status.toUpperCase()}
              </span>
              <br />
              <div className="py-2">{road.description}</div>
              <div>
                Date Recorded:{' '}
                <span className="font-bold">
                  {dayjs(road.timestamp).format('MMMM D, YYYY h:mm A')}
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
