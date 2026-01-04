import React, { useState, useEffect } from 'react';
import { FaCrown } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import Close from './Close';
import { useNavigate } from 'react-router-dom';

export default function SideList({ closeSidebar }) {
  const [showAlt, setShowAlt] = useState(false);
  const [currLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isActivate, setIsActivate] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [lastSeenLocationName, setLastSeenLocationName] = useState(null);

  const navigate = useNavigate()

  // Check for saved theme preference or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Check if geolocation is available
  useEffect(() => {
    if ('geolocation' in navigator) {
      setIsLocationEnabled(true);
    }
  }, []);

  const items = [
    {
      inputs: ['Current Location', 'Destination'],
      button: 'Start a journey',
    },
    {
      header: 'Alternative Routes',
      disabled: true,
      routes: ['Route 1', 'Route 2', 'Route 3'],
    },
    {
      header: 'Dashboard',
      navItems: ['Overview', 'Statistics'],
    },
    {
      header: 'Anomalies',
      navItems: ['View All Anomalies', 'Report Anomaly'],
    },
    {
      header: 'Journeys',
      navItems: ['View Map', 'Past Journeys', 'Last Seen Location'],
    },
    {
      header: 'Settings',
      navItems: ['Dark/Light Mode', 'Turn On Location'],
    },
    {
      header: 'Help',
      navItems: ['About'],
    },
  ];

  // Reverse geocoding to get location name from coordinates
  const getLocationName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      if (data && data.display_name) {
        // Extract meaningful parts of the address
        const address = data.address;
        const parts = [];
        
        if (address.road || address.street) parts.push(address.road || address.street);
        if (address.suburb || address.neighbourhood) parts.push(address.suburb || address.neighbourhood);
        if (address.city || address.town) parts.push(address.city || address.town);
        if (address.state) parts.push(address.state);
        
        return parts.slice(0, 2).join(', ') || data.display_name.split(',')[0];
      }
      return 'Unknown location';
    } catch (error) {
      console.error('Error getting location name:', error);
      return 'Unknown location';
    }
  };

  // Forward geocoding to get coordinates from location name
  const geocodeLocation = async (locationName) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}&limit=1&countrycodes=ng`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        return {
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          display_name: result.display_name
        };
      }
      return null;
    } catch (error) {
      console.error('Error geocoding location:', error);
      return null;
    }
  };

  function handleLocation(e) {
    const { name, value } = e.target;

    if (name === 'Current Location') {
      setCurrentLocation(value);
      setIsComplete(value !== '' && destination !== '');
    } else {
      setDestination(value);
      setIsComplete(currLocation !== '' && value !== '');
    }
  }

  // Action: Use current device location to fill "Current Location"
  async function handleUseCurrentLocation() {
    if (!('geolocation' in navigator)) {
      alert('Geolocation not supported on this device/browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const formatted = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        setUserLocation({ lat: latitude, lng: longitude });
        setCurrentLocation(formatted);
        setIsComplete(formatted !== '' && destination !== '');

        // Get and store the location name for "Last Seen Location"
        getLocationName(latitude, longitude).then(locationName => {
          setLastSeenLocationName(locationName);
        });

        // Immediately dispatch origin to map so it can center/prepare routing
        window.dispatchEvent(
          new CustomEvent('smartroute:set-points', {
            detail: {
              origin: { lat: latitude, lng: longitude },
              destination: null,
            },
          })
        );
      },
      (err) => {
        const msg = err.code === err.PERMISSION_DENIED
          ? 'Location permission denied. Please allow access.'
          : err.code === err.POSITION_UNAVAILABLE
          ? 'Location unavailable. Try again later.'
          : err.code === err.TIMEOUT
          ? 'Location request timed out.'
          : 'Failed to get location.';
        alert(msg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  async function handleStartJourney() {
    if (!isComplete) return;
    setIsActivate(true);

    // Try to parse "lat,lng" formats first
    const parseLatLng = (text) => {
      if (!text) return null;
      const parts = text.split(',').map((s) => s.trim());
      if (parts.length === 2) {
        const lat = parseFloat(parts[0]);
        const lng = parseFloat(parts[1]);
        if (!Number.isNaN(lat) && !Number.isNaN(lng)) return { lat, lng };
      }
      return null;
    };

    let originCoord = parseLatLng(currLocation);
    let destCoord = parseLatLng(destination);

    // If not coordinates, try geocoding the location names
    if (!originCoord && currLocation) {
      toast.loading('Finding origin location...', { id: 'geocode-origin' });
      const geocoded = await geocodeLocation(currLocation);
      if (geocoded) {
        originCoord = { lat: geocoded.lat, lng: geocoded.lng };
        toast.success(`Found: ${geocoded.display_name.split(',')[0]}`, { id: 'geocode-origin' });
      } else {
        toast.error('Could not find origin location. Try being more specific.', { id: 'geocode-origin' });
        setIsActivate(false);
        return;
      }
    }

    if (!destCoord && destination) {
      toast.loading('Finding destination...', { id: 'geocode-dest' });
      const geocoded = await geocodeLocation(destination);
      if (geocoded) {
        destCoord = { lat: geocoded.lat, lng: geocoded.lng };
        toast.success(`Found: ${geocoded.display_name.split(',')[0]}`, { id: 'geocode-dest' });
      } else {
        toast.error('Could not find destination. Try being more specific.', { id: 'geocode-dest' });
        setIsActivate(false);
        return;
      }
    }

    // Dispatch coordinates to the map
    window.dispatchEvent(
      new CustomEvent('smartroute:set-points', {
        detail: {
          origin: originCoord,
          destination: destCoord,
        },
      })
    );
    
    // Close sidebar after starting journey
    if (closeSidebar) {
      closeSidebar();
    }
    navigate('/home/map');
  }

  function handleRouteSelect() {
    setShowAlt(false);
    if (closeSidebar) {
      closeSidebar();
    }
  }

  // Toggle dark/light mode
  function toggleDarkMode() {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  function handleAboutClick() {
      navigate('/');
  }

  function handleGeneralAnomaliesClick() {
    navigate('/home/all-anomalies');
    closeSidebar();
  }
    function handlePastJourneysClick() {
      navigate('/home/past-journeys');
      
      closeSidebar();
    }

  // Request location permission and get current location
  function handleLocationToggle() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }


    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setCurrentLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        setIsComplete(destination !== '');
        
        // Get and store the location name for "Last Seen Location"
        getLocationName(latitude, longitude).then(locationName => {
          setLastSeenLocationName(locationName);
        });
        
        alert('Location access granted! Your current location has been set.');
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('Location access denied. Please enable location in your browser settings.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            alert('Location request timed out.');
            break;
          default:
            alert('An unknown error occurred while retrieving location.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  }

  // Handle click events for specific nav items
  function handleNavItemClick(navItem) {
    switch (navItem) {
      case 'Dark/Light Mode':
        toggleDarkMode();
        break;
      case 'Turn On Location':
        handleLocationToggle();
        break;
      case 'About':
        handleAboutClick();
        break;
      case 'View All Anomalies':
        handleGeneralAnomaliesClick();
        break;
      case 'Past Journeys':
        handlePastJourneysClick();
        break;
      case 'Overview':
      case 'Statistics':
        navigate('/home');
        closeSidebar();
        break;
      case 'View Map':
        navigate('/home/map');
        closeSidebar();
        break;
      case 'Report Anomaly':
        toast.info('Report Anomaly feature coming soon!');
        break;
      case 'Last Seen Location':
        if (lastSeenLocationName) {
          toast.success(`Your last seen location is ${lastSeenLocationName}`);
        } else if (userLocation) {
          // If we have coordinates but no name yet, get the name
          getLocationName(userLocation.lat, userLocation.lng).then(locationName => {
            setLastSeenLocationName(locationName);
            toast.success(`Your last seen location is ${locationName}`);
          });
        } else {
          toast.error('No location data available. Please enable location access first.');
        }
        break;
      default:
        // Handle other nav items
        console.log(`Clicked on: ${navItem}`);
    }
  }

  return (
    <div className="h-[93%] overflow-y-auto p-4">
      {items.map((item, index) => {
        return (
          <div className={`relative mb-4 border-b border-green-300`} key={index}>
            {item.header && (
              <h3
                className={(() => {
                  if (item.header === 'Alternative Routes') {
                    return 'font-bold text-green-300 opacity-60 select-none cursor-not-allowed';
                  }
                  return `font-bold text-green-600 ${
                    item.routes &&
                    isActivate &&
                    'cursor-pointer transition hover:my-2 hover:scale-x-105'
                  } ${item.routes && !isActivate && 'text-green-200'}`;
                })()}
                onClick={
                  item.header === 'Alternative Routes'
                    ? undefined
                    : item.routes && isActivate
                    ? () => setShowAlt(!showAlt)
                    : undefined
                }
              >
                {item.header === 'Alternative Routes' ? (
                  <span className="flex items-center gap-2">
                    <FaCrown className="text-yellow-500" />
                    <span>Alternative Routes</span>
                  </span>
                ) : (
                  item.header
                )}
              </h3>
            )}
            {item.inputs?.map((input, key) => {
              return (
                <div key={key} className="pl-5">
                  <input
                    type="text"
                    name={input}
                    placeholder={input === 'Current Location' ? 'Enter location or lat,lng' : 'Enter destination or lat,lng'}
                    value={
                      input === 'Current Location' ? currLocation : destination
                    }
                    className="my-2 w-full rounded border border-green-400 p-2 font-bold text-green-600 outline-none"
                    onChange={handleLocation}
                  />
                    {input === 'Current Location' && (
                      <button
                        type="button"
                        onClick={handleUseCurrentLocation}
                        className="text-xs font-semibold text-green-600 hover:underline animate-bounce"
                      >
                        Use current location
                      </button>
                    )}
                </div>
              );
            })}
            {item.button && (
              <button
                className={`mx-auto my-2 block rounded-lg border p-3 text-green-500 transition ${
                  isComplete
                    ? 'border-green-500 hover:bg-green-500 hover:text-green-50'
                    : 'cursor-not-allowed border-gray-400 bg-gray-400 text-white'
                }`}
                onClick={handleStartJourney}
                disabled={!isComplete}
              >
                {item.button}
              </button>
            )}
            {item.navItems?.map((navItem, key) => {
              return (
                <div key={key} className="pl-8">
                  <p 
                    className="cursor-pointer text-green-500 transition hover:font-bold hover:text-green-600 hover:underline flex items-center justify-between"
                    onClick={() => handleNavItemClick(navItem)}
                  >
                    <span>{navItem}</span>
                    {navItem === 'Dark/Light Mode' && (
                      <span className="text-xs">
                        {/* {isDarkMode ? '🌙' : '☀️'} */}
                      </span>
                    )}
                    {navItem === 'Turn On Location' && (
                      <span className="text-xs">
                        {/* {userLocation ? '📍' : '📍❌'} */}
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
            {showAlt && item.routes && item.header !== 'Alternative Routes' && (
              <div className="absolute -top-2 right-0 z-[999999999] rounded border border-green-500 bg-gray-100 p-4">
                <Close
                  closeBar={() => {
                    setShowAlt(false);
                  }}
                />
                {item.routes.map((route, key) => {
                  return (
                    <div key={key} onClick={handleRouteSelect}>
                      <p className="my-2 cursor-pointer text-green-600 transition hover:font-bold hover:underline">
                        {route}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      
      {/* Toast container with high z-index */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            zIndex: 99999,
          },
          success: {
            style: {
              background: '#10B981',
              color: 'white',
              zIndex: 99999,
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: 'white',
              zIndex: 99999,
            },
          },
        }}
        containerStyle={{
          zIndex: 99999,
        }}
      />
    </div>
  );
}
