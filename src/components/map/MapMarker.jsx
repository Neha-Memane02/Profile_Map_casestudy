import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const MapMarker = ({ position, profile }) => {
  return (
    <Marker position={position}>
      <Popup>
        <div className="marker-popup">
          <h4>{profile.name}</h4>
          <p>{profile.address.street}</p>
          <p>{profile.address.city}, {profile.address.state}</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default MapMarker;