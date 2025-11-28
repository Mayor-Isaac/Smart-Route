import React, { useState, useEffect, useRef, useCallback } from 'react';

// This component wraps the <gmp-basic-place-autocomplete> web component
// to make it compatible with React's component lifecycle and event handling.
const PlacePicker = ({ onPlaceSelect, placeholder }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // The 'gmp-placechange' event is fired by the web component when a place is selected.
    const listener = (ev) => {
      const place = ev.target.place;
      if (place) {
        onPlaceSelect(place);
      }
    };

    element.addEventListener('gmp-placechange', listener);

    // Clean up the event listener when the component unmounts.
    return () => {
      element.removeEventListener('gmp-placechange', listener);
    };
  }, [onPlaceSelect]);

  // In React, custom element tags must be lowercase.
  return (
    <gmp-basic-place-autocomplete
      ref={ref}
      placeholder={placeholder}
    ></gmp-basic-place-autocomplete>
  );
};

export default function GoogleMaps() {
  const [map, setMap] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [routeInfo, setRouteInfo] = useState(null);

  const mapRef = useRef(null);
  const polylinesRef = useRef([]);
  const markersRef = useRef([]);

  useEffect(() => {
    const initMap = async () => {
      try {
        const { Map } = await google.maps.importLibrary('maps');
        // The Places library is needed for the Place Picker web component.
        await google.maps.importLibrary('places');
        const mapInstance = new Map(mapRef.current, {
          center: { lat: 37.422, lng: -122.084 },
          zoom: 12,
          mapId: 'DEMO_MAP_ID',
        });
        setMap(mapInstance);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      // Handle case where Google Maps script hasn't loaded yet
      const checkGoogleMaps = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogleMaps);
          initMap();
        }
      }, 100);

      // Cleanup interval on unmount
      return () => clearInterval(checkGoogleMaps);
    }
  }, []);

  const handleGetRoute = useCallback(
    async (e) => {
      e.preventDefault();
      if (!origin || !destination || !map) {
        setRouteInfo({ error: 'Please select an origin and a destination.' });
        return;
      }

      // Clear previous polylines and markers
      polylinesRef.current.forEach((p) => p.setMap(null));
      polylinesRef.current = [];
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
      setRouteInfo(null);

      try {
        const { Route } = await google.maps.importLibrary('routes');
        const { routes } = await Route.computeRoutes({
          // The place object from the UI Kit has a 'location' property (a LatLng).
          origin: { location: origin.location },
          destination: { location: destination.location },
          travelMode,
          fields: [
            'path',
            'legs',
            'viewport',
            'localizedValues',
            'warnings',
            'distanceMeters',
            'durationMillis',
          ],
        });

        if (routes && routes.length > 0) {
          const currentRoute = routes[0];
          const newPolylines = currentRoute.createPolylines({
            polylineOptions: { map },
          });
          polylinesRef.current = newPolylines;

          const newMarkers = await currentRoute.createWaypointAdvancedMarkers({
            map,
          });
          markersRef.current = newMarkers;

          map.fitBounds(currentRoute.viewport);

          const distanceText =
            currentRoute.localizedValues?.distance?.text ?? 'N/A';
          const durationText =
            currentRoute.localizedValues?.duration?.text ?? 'N/A';
          setRouteInfo({
            distance: distanceText,
            duration: durationText,
            warnings: currentRoute.warnings,
          });
        } else {
          setRouteInfo({ error: 'No routes found.' });
        }
      } catch (error) {
        console.error('Error computing routes:', error);
        setRouteInfo({ error: 'Failed to compute routes. ' + error.message });
      }
    },
    [origin, destination, travelMode, map]
  );

  return (
    <div className="flex h-full w-full gap-4">
      <div className="w-1/3 overflow-y-auto rounded-lg bg-white p-4 shadow-lg">
        <form onSubmit={handleGetRoute} className="space-y-4">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-green-600">Get a Route</h2>
            <div className="mb-4">
              <label className="mb-2 block font-semibold text-gray-700">Origin</label>
              <PlacePicker
                onPlaceSelect={setOrigin}
                placeholder="Enter an origin"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-semibold text-gray-700">Destination</label>
              <PlacePicker
                onPlaceSelect={setDestination}
                placeholder="Enter a destination"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-semibold text-gray-700">Travel Mode</label>
              <select
                value={travelMode}
                onChange={(e) => setTravelMode(e.target.value)}
                className="w-full rounded border border-gray-300 p-2 focus:border-green-500 focus:outline-none"
              >
                <option value="DRIVING">Driving</option>
                <option value="WALKING">Walking</option>
                <option value="BICYCLING">Bicycling</option>
                <option value="TRANSIT">Transit</option>
              </select>
            </div>
          </section>
          <button 
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700" 
            type="submit"
          >
            Get route
          </button>
        </form>
        <div className="mt-6">
          {routeInfo && (
            <div className="rounded-lg bg-gray-50 p-4">
              {routeInfo.error ? (
                <p className="text-red-600">{routeInfo.error}</p>
              ) : (
                <>
                  <h3 className="mb-3 text-xl font-bold text-green-600">Route Details</h3>
                  <p className="mb-2"><span className="font-semibold">Distance:</span> {routeInfo.distance}</p>
                  <p className="mb-2"><span className="font-semibold">Duration:</span> {routeInfo.duration}</p>
                  {routeInfo.warnings && routeInfo.warnings.length > 0 && (
                    <>
                      <h4 className="mt-4 font-semibold text-yellow-600">Warnings:</h4>
                      <ul className="ml-4 mt-2 list-disc">
                        {routeInfo.warnings.map((warning, index) => (
                          <li key={index} className="text-sm text-gray-700">{warning}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div ref={mapRef} className="h-[600px] w-2/3 rounded-lg shadow-lg" />
    </div>
  );
}
