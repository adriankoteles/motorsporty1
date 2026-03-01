/* src/TrackDetail.jsx */
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import { ALL_TRACKS } from './constants/tracks';
import './TrackDetail.css';

// KOMPONENTA TABULKY S FUNKČNÍM TLAČÍTKEM
function LeaderboardTable({ trackId, variant }) {
  const [laps, setLaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLaps = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('laptimes')
        .select('*')
        .eq('track_id', trackId)
        .eq('variant_name', variant.id)
        .order('lap_time', { ascending: true });

      if (!error && data) {
        const uniqueLaps = [];
        const seen = new Set();
        for (const lap of data) {
          const key = lap.nick_name.toLowerCase();
          if (!seen.has(key)) {
            seen.add(key);
            uniqueLaps.push(lap);
            if (uniqueLaps.length === 5) break;
          }
        }
        setLaps(uniqueLaps);
      }
      setLoading(false);
    };
    fetchLaps();
  }, [trackId, variant.id]);

  return (
    <div className="v-lb-card">
      <div className="v-lb-header">
        <div className="v-lb-title">{variant.id}</div>
        <div className="v-lb-meta">
          DÉLKA <span>{variant.length}</span> • POČET ZATÁČEK <span>{variant.turns}</span>
        </div>
      </div>
      <div className="v-lb-body">
        {loading ? (
          <div className="v-lb-line">Načítám...</div>
        ) : laps.length > 0 ? (
          laps.map((lap, i) => (
            <div key={lap.id} className="v-lb-line">
              <span className="idx">{i + 1}.</span>
              <span className="name">
                {lap.real_name ? `${lap.real_name} (${lap.nick_name})` : lap.nick_name}
                {lap.gender === 'muz' && <span style={{ color: '#00bfff', marginLeft: '6px' }}>♂</span>}
                {lap.gender === 'zena' && <span style={{ color: '#ff69b4', marginLeft: '6px' }}>♀</span>}
                {lap.instagram && (
                  <a
                    href={`https://instagram.com/${lap.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="v-ig-badge"
                    title={`Instagram: ${lap.instagram}`}
                  >
                    <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                    IG
                  </a>
                )}
              </span>
              <span className="date" style={{ color: '#888', fontSize: '0.75rem', marginRight: '16px' }}>
                {new Date(lap.created_at || Date.now()).toLocaleDateString('cs-CZ')}
              </span>
              <span className="time">{lap.lap_time.toFixed(4)}s</span>
            </div>
          ))
        ) : (
          <div className="v-lb-line">Žádné časy</div>
        )}
      </div>

      {/* TLAČÍTKO S PŘESMĚROVÁNÍM NA FILTR */}
      <button
        className="v-lb-btn"
        onClick={() => navigate(`/casy?trackId=${trackId}&variant=${variant.id}`)}
      >
        VŠECHNY ČASY
      </button>
    </div>
  );
}

function TrackDetail() {
  const { trackId } = useParams();
  const track = ALL_TRACKS.find(t => t.id === parseInt(trackId));
  const [activeVariantId, setActiveVariantId] = useState(track?.variants?.[0]?.id || '');

  if (!track) return <div className="victory-container" style={{ paddingTop: '100px' }}>Trať nenalezena.</div>;

  const currentV = track.variants?.find(v => v.id === activeVariantId);

  return (
    <div className="track-detail-page">
      <header
        className="v-hero"
        style={{ backgroundImage: `url(/assets/tracks/${track.coverImg ? track.coverImg : track.img})` }}
      >
        <div className="v-hero-overlay">
          <div className="victory-container">
            <Link to="/" className="back-link-1-1">← ZPĚT NA SEZNAM</Link>
            <h1 className="v-hero-title">{track.name}</h1>
          </div>
        </div>
      </header>

      <div className="victory-container">
        <section className="v-section">
          <h2 className="v-label">O TRATI</h2>
          <p className="v-desc">{track.description}</p>
        </section>

        {/* MOTOKÁRY */}
        {track.karts && track.karts.length > 0 && (
          <section className="v-section">
            <h2 className="v-label">MOTOKÁRY</h2>
            <div className={`v-karts-grid ${track.karts.length === 1 ? 'single-kart' : ''}`}>
              {track.karts.map((kart, i) => (
                <div key={i} className="v-kart-card">
                  <div className="kart-image-wrapper">
                    <img src={`/assets/motokary/${kart.img}`} alt={kart.model} className="kart-image" onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                  <div className="kart-content">
                    <h3 className="kart-title">{kart.model}</h3>
                    <p className="kart-desc">{kart.desc}</p>

                    <div className="kart-stats-row">
                      <div className="k-stat">
                        <span className="icon">⚡</span>
                        <div className="info">
                          <span className="label">Výkon</span>
                          <strong>{kart.power || kart.hp}</strong>
                        </div>
                      </div>
                      <div className="k-stat">
                        <span className="icon">⏱️</span>
                        <div className="info">
                          <span className="label">Maximální rychlost</span>
                          <strong>{kart.speed}</strong>
                        </div>
                      </div>
                      <div className="k-stat">
                        <span className="icon">⚖️</span>
                        <div className="info">
                          <span className="label">Váha</span>
                          <strong>{kart.weight}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="kart-engine">
                      <span className="label">Typ motoru</span>
                      <strong>{kart.engine}</strong>
                    </div>

                    <div className="kart-features">
                      <span className="label">Vlastnosti</span>
                      <ul>
                        {kart.features?.map((f, fi) => <li key={fi}>{f}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* VARIANTY A MAPA */}
        <section className="v-section">
          <h2 className="v-label">VARIANTY TRATĚ</h2>
          <div className="v-tabs">
            {track.variants.map(v => (
              <button
                key={v.id}
                className={activeVariantId === v.id ? 'active' : ''}
                onClick={() => setActiveVariantId(v.id)}
              >
                {v.id}
              </button>
            ))}
          </div>
          <div className="v-var-box">
            <div className="v-var-info">
              <h3 className="v-var-title">{activeVariantId}</h3>
              <p className="v-var-desc">{currentV?.desc || 'The complete track configuration utilizing every section.'}</p>
              <div className="v-var-stats">
                <div className="v-var-stat">
                  <span className="icon">📏</span>
                  <div className="info">
                    <span className="label">Délka</span>
                    <strong>{currentV?.length || '520m'}</strong>
                  </div>
                </div>
                <div className="v-var-stat">
                  <span className="icon">↩️</span>
                  <div className="info">
                    <span className="label">Počet zatáček</span>
                    <strong>{currentV?.turns || '12'}</strong>
                  </div>
                </div>
              </div>

              <div className="v-var-features">
                <span className="label">Vlastnosti</span>
                <ul>
                  {currentV?.features ? currentV.features.map((f, i) => <li key={i}>{f}</li>) : (
                    <>
                      <li>Asfaltový povrch</li>
                      <li>Maximálně 18 motokár v jedné jízdě</li>
                      <li>Digital lap timer display</li>
                      <li>Adjustable pedals</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div className="v-var-map">
              {/* Place track map image here based on currentV */}
              {(currentV?.map) ? (
                <div className="v-map-img-container" key={currentV.id}>
                  <img src={`/assets/tracks_maps/${currentV.map}`} alt={currentV.id} className="v-map-img" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  <div className="v-map-placeholder" style={{ display: 'none' }}>
                    <svg width="100%" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 50 100 C 50 50, 150 50, 200 100 C 250 150, 350 150, 350 100 C 350 50, 250 50, 200 50 C 150 50, 50 50, 50 100 Z" fill="none" stroke="#d9ff00" strokeWidth="8" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="v-map-placeholder">
                  <svg width="100%" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 50 100 C 50 50, 150 50, 200 100 C 250 150, 350 150, 350 100 C 350 50, 250 50, 200 50 C 150 50, 50 50, 50 100 Z" fill="none" stroke="#d9ff00" strokeWidth="8" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* LEADERBOARDY */}
        <section className="v-section">
          {/* Zde nezobrazujeme nadpis "LEADERBOARDY", protože chceme mít tabulky pro všechny varianty podle designu */}
          <div className="v-lb-row">
            {track.variants.map((v) => (
              <LeaderboardTable
                key={v.id}
                trackId={track.id}
                variant={v}
              />
            ))}
          </div>
        </section>



      </div >
    </div >
  );
}

export default TrackDetail;