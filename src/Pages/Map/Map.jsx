import React, { useState } from 'react';
import MapComponent from '../../ui/MapComponent';
import Sidebar from '../../ui/Sidebar';
import { HiMenu } from 'react-icons/hi';

export default function Map() {
  const [showMenu, setShowMenu] = useState(true);
  const closeBar = function () {
    setShowMenu(!showMenu);
  };

  return (
    <>
      
      <div className="">
        <MapComponent />
      </div>
    </>
  );
}
