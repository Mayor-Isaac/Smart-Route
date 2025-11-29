import React, { useState } from 'react';
import MapComponent from '../../ui/MapComponent';
import Sidebar from '../../ui/Sidebar';
import { HiMenu } from 'react-icons/hi';
import GoogleMaps from '../../ui/GoogleMaps';
import MapViewer from '../../ui/MapViewer';
import FreeNavigationMap from '../../Components/Leaflet/FreeNavigationMap';

export default function Map() {
  const [showMenu, setShowMenu] = useState(true);
  const closeBar = function () {
    setShowMenu(!showMenu);
  };

  return (
    <div className="border border-red-500">
      {/* <MapViewer /> */}
      <FreeNavigationMap />
    </div>
  );
}
