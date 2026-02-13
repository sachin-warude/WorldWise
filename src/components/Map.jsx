import React, { useEffect, useState } from 'react';
import styles from './Map.module.css';
import 'leaflet/dist/leaflet.css';

import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from 'react-leaflet';
import { useCity } from '../context/CityProvider';

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');
  const { cities } = useCity();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);
  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <MapContainer
        center={mapPosition}
        zoom={6}
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
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
