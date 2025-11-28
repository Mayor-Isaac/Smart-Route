import React, { useState } from 'react';
import Close from './Close';

export default function SideList({ closeSidebar }) {
  const [showAlt, setShowAlt] = useState(false);
  const [currLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isActivate, setIsActivate] = useState(false);

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

  function handleStartJourney() {
    if (isComplete) {
      setIsActivate(true);
    }
  }

  function handleRouteSelect() {
    setShowAlt(false);
    if (closeSidebar) {
      closeSidebar();
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
                  <p className="cursor-pointer text-green-500 transition hover:font-bold hover:text-green-600 hover:underline">
                    {navItem}
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
