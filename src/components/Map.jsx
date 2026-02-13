import React, { useState } from 'react';
import styles from './Map.module.css';
import 'leaflet/dist/leaflet.css';

import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useCity } from '../context/CityProvider';

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const navigate = useNavigate();
  const { cities } = useCity();
  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map(city => (
          <Marker position={[city.position.lat, city.position.lng]}>
            <Popup>
              {city.emoji} <br /> {city.cityName}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
