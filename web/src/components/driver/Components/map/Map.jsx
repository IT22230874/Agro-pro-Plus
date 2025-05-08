import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useGeoLocation from './useGeoLocation';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import osm from './osmProviders.jsx';
import './map.css';
import LocationMarker from './LocationMarker.jsx';
import axios from 'axios'; // Use axios for API calls

const Map = () => {
  const location = useGeoLocation();
  const [center, setCenter] = useState(null);
  const [distributors, setDistributors] = useState([]); // State for distributor data
  const ZOOM_LEVEL = 8.3;
  const mapRef = useRef();

  const markerIcon = new L.Icon({
    iconUrl: require("../../../../assests/supermaket.png"),
    iconSize: [30, 30],
    iconAnchor: [17, 45],
    popupAnchor: [0, -46]
  });

  const markerIcon2 = new L.Icon({
    iconUrl: require("../../../../assests/placeholder.png"),
    iconSize: [35, 35],
    iconAnchor: [17, 45],
    popupAnchor: [0, -46]
  });

  // Fetch distributor data from the backend
  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const response = await axios.get("/distribute/"); // Replace with your backend URL
        setDistributors(response.data); // Assuming the response contains an array of distributors
      } catch (error) {
        console.error('Error fetching distributors:', error);
      }
    };

    fetchDistributors();
  }, []);

  // Update center when user location is loaded
  useEffect(() => {
    if (location.loaded && !location.error) {
      setCenter({ lat: location.coordinates.lat, lng: location.coordinates.lng });
    }
  }, [location]);

  return (
    <div style={{ height: '520px' }}>
      <MapContainer
        center={center || { lat: 7.873054, lng: 80.771797 }} // Default center for Sri Lanka
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '600px' }}
        className="map-container"
      >
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />

        {/* ---------distributor locations fetched from backend--------- */}
        {distributors.map((distribute, index) => (
          <Marker
            key={index}
            position={[distribute.location.lat, distribute.location.lng]}
            icon={markerIcon}
          >
            <Popup>
              <div>
                <b>{distribute.business_name}</b><br />
                Situated at: {distribute.situated_place}<br />
                Owner: {distribute.Owner_name}<br />
                Contact: {distribute.phone_no}<br />
                <img 
                  src={distribute.imgUrl} 
                  alt={`${distribute.business_name} image`} 
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                />
              </div>
            </Popup>
          </Marker>
        ))}

        {/* ---------live location--------- */}
        {location.loaded && !location.error && (
          <Marker
            icon={markerIcon2}
            position={[location.coordinates.lat, location.coordinates.lng]}
          >
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* ---------click to show current location--------- */}
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
