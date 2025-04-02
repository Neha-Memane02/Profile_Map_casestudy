import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import MapMarker from './MapMarker';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map view when center changes
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const MapView = ({ profile, center, zoom = 13 }) => {
  if (!profile || !center) {
    return <div className="map-placeholder">No location selected</div>;
  }

  return (
    <div className="map-container">
      <h3>Location: {profile.name}</h3>
      <MapContainer 
        center={center}
        zoom={zoom}
        style={{ height: '400px', width: '100%' }}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapMarker 
          position={center}
          profile={profile}
        />
      </MapContainer>
      
      <div className="address-info">
        <p>{profile.address.street}</p>
        <p>{profile.address.city}, {profile.address.state} {profile.address.zip}</p>
        <p>{profile.address.country}</p>
      </div>
    </div>
  );
};

export default MapView;