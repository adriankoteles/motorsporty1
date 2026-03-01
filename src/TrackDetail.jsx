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
        .order('lap_time', { ascending: true })
        .limit(5);

      if (!error) setLaps(data || []);
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
              <span className="name">{lap.nick_name}</span>
              <span className="time">{lap.lap_time.toFixed(4)}</span>
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
            <div className="v-hero-tags">
              <span className="v-tag">Nightracing</span>
              <span className="v-tag">Elektrické</span>
              <span className="v-tag">Indoor</span>
            </div>
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

        {/* DALŠÍ INFORMACE */}
        <section className="v-section" style={{ marginBottom: '50px' }}>
          <h2 className="v-label">DALŠÍ INFORMACE</h2>
          <div className="v-info-list" style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem' }}>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>Hlavní rovinka:</strong> Přes 100 metrů prostoru pro maximální akceleraci.</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>Povrch:</strong> Asfaltový povrch položený na úplné rovině bez převýšení</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>Noční závodění</strong></li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>Vybavení:</strong> Zapůjčení profesionální přilby je <strong style={{ color: 'white' }}>ZDARMA</strong>. Z hygienických důvodů je povinná kukla (lze zakoupit na místě).</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>Rodinné vyžití:</strong> Kompletní program pro budoucí šampiony - dětské motokáry, čtyřkolky, mašinky a doplňková adventure dráha.</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>Motobar:</strong> Široký výběr nápojů a teplé občerstvení (pizza, čerstvé bagety, párek v rohlíku) přímo v areálu.</li>
            </ul>
          </div>
        </section>

      </div >
    </div >
  );
}

export default TrackDetail;