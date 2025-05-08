import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DistributerLocationMap = ({ Distributes }) => {
  // Calculate the center of the map based on the first distributor's location
  const mapCenter = Distributes.length > 0
    ? [parseFloat(Distributes[0].latitude), parseFloat(Distributes[0].longitude)]
    : [7.8731, 80.7718]; // Default to Sri Lanka if no locations available

  const mapZoom = 7; // Initial zoom level

  // Custom icon for markers
  const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div style={{ height: '500px', borderRadius: '15px', overflow: 'hidden' }}>
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {Distributes.map((distribute) => (
          distribute.latitude && distribute.longitude && (
            <Marker
              key={distribute._id}
              position={[parseFloat(distribute.latitude), parseFloat(distribute.longitude)]}
              icon={redIcon}
            >
              <Popup>
                <strong>{distribute.business_name}</strong><br />
                {distribute.situated_place}
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default DistributerLocationMap;
