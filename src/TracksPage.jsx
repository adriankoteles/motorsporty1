/* src/TracksPage.jsx */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ALL_TRACKS } from './constants/tracks';
import './TracksPage.css';

// Vlastní neonově žlutá ikonka pro moderní mapu
const yellowIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #d9ff00; width: 12px; height: 12px; border-radius: 50%; border: 2px solid black; box-shadow: 0 0 10px #d9ff00;"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

function MapBoundsFilter({ onBoundsChange }) {
  const map = useMapEvents({
    moveend: () => onBoundsChange(map.getBounds()),
    zoomend: () => onBoundsChange(map.getBounds()),
  });
  return null;
}

function TracksPage() {
  const [visibleTracks, setVisibleTracks] = useState(ALL_TRACKS);
  const navigate = useNavigate();

  const handleBoundsChange = (bounds) => {
    const filtered = ALL_TRACKS.filter(track => bounds.contains(track.coords));
    setVisibleTracks(filtered);
  };

  return (
    <div className="tracks-page">
      {/* MAPA NA CELOU ŠÍŘKU podle Figmy */}
      <div className="map-wrapper">
        <MapContainer center={[49.8, 15.5]} zoom={7} className="modern-map" scrollWheelZoom={false}>
          {/* Světlý moderní design mapy */}
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          <MapBoundsFilter onBoundsChange={handleBoundsChange} />
          {ALL_TRACKS.map(track => (
            <Marker key={track.id} position={track.coords} icon={yellowIcon}>
              <Popup>
                <div className="map-popup">
                  <h3>{track.name}</h3>
                  <button className="popup-btn" onClick={() => navigate(`/trat/${track.id}`)}>VÍCE INFO</button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="victory-container">
        <h2 className="section-title">MOTOKÁRY</h2>
        <div className="tracks-grid">
          {visibleTracks.map(track => (
            <div key={track.id} className="track-card-wrapper" onClick={() => navigate(`/trat/${track.id}`)}>
              {/* Zoomovací pozadí */}
              <div 
                className="track-card-bg" 
                style={{ backgroundImage: `url(/assets/tracks/${track.img})` }}
              ></div>
              
              {/* Tmavý filtr pro čitelnost textu nahoře */}
              <div className="track-card-overlay"></div>
              
              {/* Obsah nahoře podle Figmy */}
              <div className="track-card-content">
                <div className="track-card-header">
                  <span className="city-tag">{track.city}</span>
                  <h3 className="track-name">{track.name}</h3>
                </div>
                {track.hasRental && <span className="rental-tag">PŮJČOVNA</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TracksPage;