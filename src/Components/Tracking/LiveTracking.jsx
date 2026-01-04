import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaTimes, FaShare, FaUsers } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function LiveTracking() {
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [trackingId, setTrackingId] = useState(null);
  const [sharedWith, setSharedWith] = useState([]);

  useEffect(() => {
    let watchId;

    if (isTracking) {
      // Start watching position
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, speed, heading } = position.coords;
          setCurrentLocation({
            lat: latitude,
            lng: longitude,
            speed: speed ? (speed * 3.6).toFixed(1) : 0, // Convert m/s to km/h
            heading: heading || 0,
            timestamp: new Date().toISOString(),
          });

          // Broadcast location update
          window.dispatchEvent(
            new CustomEvent('smartroute:location-update', {
              detail: {
                lat: latitude,
                lng: longitude,
                speed,
                heading,
                trackingId: trackingId,
              },
            })
          );
        },
        (error) => {
          console.error('Tracking error:', error);
          toast.error('Failed to get location. Check location permissions.');
          setIsTracking(false);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 5000,
        }
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isTracking, trackingId]);

  const startTracking = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported');
      return;
    }

    const id = `track-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setTrackingId(id);
    setIsTracking(true);
    toast.success('Live tracking started', { icon: '📍' });
  };

  const stopTracking = () => {
    setIsTracking(false);
    setTrackingId(null);
    toast.success('Live tracking stopped');
  };

  const shareTracking = () => {
    if (!trackingId) return;

    // Simulate sharing with contacts
    const shareLink = `${window.location.origin}/track/${trackingId}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Track my location - Smart Route',
        text: 'Follow my journey in real-time',
        url: shareLink,
      }).then(() => {
        toast.success('Tracking link shared!');
        setSharedWith([...sharedWith, 'Contact']);
      }).catch(() => {
        // Fallback to clipboard
        copyToClipboard(shareLink);
      });
    } else {
      copyToClipboard(shareLink);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Tracking link copied to clipboard!', { icon: '📋' });
      setSharedWith([...sharedWith, 'Clipboard']);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FaMapMarkerAlt className="text-green-600" />
          Live Tracking
        </h3>
      </div>

      <div className="space-y-4">
        {/* Status */}
        <div className={`p-4 rounded-lg ${isTracking ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">
                Status: {isTracking ? '🟢 Active' : '⚫ Inactive'}
              </p>
              {trackingId && (
                <p className="text-xs text-gray-600 mt-1">ID: {trackingId.slice(0, 16)}...</p>
              )}
            </div>
            <button
              onClick={isTracking ? stopTracking : startTracking}
              className={`px-4 py-2 rounded font-semibold text-sm ${
                isTracking 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isTracking ? 'Stop' : 'Start'} Tracking
            </button>
          </div>
        </div>

        {/* Current Location Info */}
        {isTracking && currentLocation && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">Current Position:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Latitude:</span>
                <p className="font-semibold">{currentLocation.lat.toFixed(6)}</p>
              </div>
              <div>
                <span className="text-gray-600">Longitude:</span>
                <p className="font-semibold">{currentLocation.lng.toFixed(6)}</p>
              </div>
              <div>
                <span className="text-gray-600">Speed:</span>
                <p className="font-semibold">{currentLocation.speed} km/h</p>
              </div>
              <div>
                <span className="text-gray-600">Last Update:</span>
                <p className="font-semibold">
                  {new Date(currentLocation.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Share Tracking */}
        {isTracking && (
          <button
            onClick={shareTracking}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded flex items-center justify-center gap-2 font-semibold"
          >
            <FaShare />
            Share Live Location
          </button>
        )}

        {/* Shared With */}
        {sharedWith.length > 0 && (
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FaUsers />
              Shared with:
            </p>
            <div className="flex flex-wrap gap-2">
              {sharedWith.map((contact, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {contact}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
          <p className="text-xs text-yellow-800">
            ⚠️ <strong>Security Note:</strong> Only share your live location with trusted contacts. 
            Tracking link expires when you stop tracking.
          </p>
        </div>
      </div>
    </div>
  );
}
