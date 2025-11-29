import React, { useState, useEffect } from 'react';
import Close from './Close';

export default function SideList({ closeSidebar }) {
  const [showAlt, setShowAlt] = useState(false);
  const [currLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isActivate, setIsActivate] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

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
      routes: ['Route 1', 'Route 2', 'Route 3'],
    },
    {
      header: 'Profile',
      navItems: ['Name', 'Car Type'],
    },
    {
      header: 'Analysis',
      navItems: ['General Anomalies', 'Anomalies along your path'],
    },
    {
      header: 'Tracking',
      navItems: ['Past Journey', 'Last Seen Location'],
    },
    {
      header: 'Settings',
      navItems: ['Dark/Light Mode', 'Turn On Location'],
    },
    {
      header: 'Help',
      navItems: ['Contact', 'About'],
    },
  ];

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

  function handleStartJourney() {
    if (!isComplete) return;
    setIsActivate(true);

    // Try to parse "lat,lng" formats; otherwise dispatch names for geocoding elsewhere
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

    const originCoord = parseLatLng(currLocation);
    const destCoord = parseLatLng(destination);

    window.dispatchEvent(
      new CustomEvent('smartroute:set-points', {
        detail: {
          origin: originCoord ? originCoord : currLocation ? { name: currLocation } : null,
          destination: destCoord ? destCoord : destination ? { name: destination } : null,
        },
      })
    );
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
      default:
        // Handle other nav items
        console.log(`Clicked on: ${navItem}`);
    }
  }

  return (
    <div className="scrollbar-hide h-[93%] overflow-y-auto p-4">
      {items.map((item, index) => {
        return (
          <div className="relative mb-4 border-b border-green-300" key={index}>
            {item.header && (
              <h3
                className={`font-bold text-green-600 ${
                  item.routes &&
                  isActivate &&
                  'cursor-pointer transition hover:my-2 hover:scale-x-105'
                } ${item.routes && !isActivate && 'text-green-200'}`}
                onClick={
                  item.header === 'Alternative Routes' && isActivate
                    ? () => setShowAlt(!showAlt)
                    : undefined
                }
              >
                {item.header}
              </h3>
            )}
            {item.inputs?.map((input, key) => {
              return (
                <div key={key} className="pl-5">
                  <input
                    type="text"
                    name={input}
                    placeholder={input}
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
                        className="text-xs font-semibold text-green-600 hover:underline"
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
                        {isDarkMode ? '🌙' : '☀️'}
                      </span>
                    )}
                    {navItem === 'Turn On Location' && (
                      <span className="text-xs">
                        {userLocation ? '📍' : '📍❌'}
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
            {showAlt && item.routes && (
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
    </div>
  );
}
