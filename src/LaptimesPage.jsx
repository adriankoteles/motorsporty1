import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import { ALL_TRACKS } from './constants/tracks';
import Tesseract from 'tesseract.js';
import PrivacyModal from './PrivacyModal';
import './LaptimesPage.css';

function LaptimesPage() {
  const [searchParams] = useSearchParams();
  const [laps, setLaps] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [consent, setConsent] = useState(false);

  // Filtry pro zobrazení
  const [fTrack, setFTrack] = useState(searchParams.get('trackId') || '');
  const [fVar, setFVar] = useState(searchParams.get('variant') || '');
  const [fSearch, setFSearch] = useState('');

  // Form data
  const [form, setForm] = useState({
    fullName: '', nickName: '', instagram: '', gender: 'muz', trackId: '', variant: '', time: '', file: null
  });

  // Filter pro pohlaví
  const [fGender, setFGender] = useState('');

  const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1477442226874356075/6BveDbvKsk-8gxQcuZw4uwc4R-6tEIuYfiCnU5zchundxv2TPSjP_W8N2eGgIH2fN4H8";

  const fetchLaps = async () => {
    let query = supabase.from('laptimes').select('*');
    if (fTrack) query = query.eq('track_id', fTrack);
    if (fVar) query = query.eq('variant_name', fVar);
    if (fGender) query = query.eq('gender', fGender);
    const { data } = await query.order('lap_time', { ascending: true });

    if (data) {
      const grouped = {};
      data.forEach(lap => {
        const key = `${lap.track_id}_${lap.variant_name}_${lap.nick_name.toLowerCase()}`;
        if (!grouped[key] || lap.lap_time < grouped[key].lap_time) {
          grouped[key] = lap;
        }
      });
      const bestLaps = Object.values(grouped).sort((a, b) => a.lap_time - b.lap_time);
      setLaps(bestLaps);
    }
  };

  useEffect(() => { fetchLaps(); }, [fTrack, fVar, fGender]);

  const handleVerifyAndSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: 'loading', text: '⚙️ AI ANALYZUJE DŮKAZ...' });

    try {
      // 1. OCR VERIFIKACE (Striktní kontrola čísel)
      const { data: { text } } = await Tesseract.recognize(form.file, 'eng');
      const ocrClean = text.toLowerCase();
      const ocrDigits = ocrClean.replace(/[^0-9]/g, '');
      const inputDigits = form.time.toString().replace(/[^0-9]/g, '');
      const nickClean = form.nickName.toLowerCase();

      const hasNick = ocrClean.includes(nickClean);
      const hasTime = ocrDigits.includes(inputDigits);

      if (!hasNick || !hasTime) {
        setStatus({
          type: 'error',
          text: `❌ ZAMÍTNUTO. ${!hasNick ? 'Nenašel jsem tvůj NICK.' : 'Nenašel jsem tvůj ČAS.'} Zkus ostřejší fotku zblízka.`
        });
        setLoading(false);
        return;
      }

      // 2. STORAGE UPLOAD (Bucket 'proofs' musí být Public)
      setStatus({ type: 'loading', text: '🚀 SCHVÁLENO. NAHRÁVÁM DO SYSTÉMU...' });
      const fileName = `${Date.now()}_${form.nickName}.jpg`;
      const { error: upErr } = await supabase.storage.from('proofs').upload(fileName, form.file);
      if (upErr) throw new Error("Chyba Storage: Zkontroluj bucket 'proofs'.");

      const proofUrl = supabase.storage.from('proofs').getPublicUrl(fileName).data.publicUrl;

      // 3. DATABASE INSERT
      const cleanTime = parseFloat(form.time.replace(',', '.'));
      const { error: dbErr } = await supabase.from('laptimes').insert([{
        real_name: form.fullName,
        nick_name: form.nickName,
        instagram: form.instagram || null,
        gender: form.gender,
        track_id: parseInt(form.trackId),
        variant_name: form.variant,
        lap_time: cleanTime,
        proof_url: proofUrl
      }]);
      if (dbErr) throw dbErr;

      // VÝPOČET UMÍSTĚNÍ
      const { data: allRankings } = await supabase
        .from('laptimes')
        .select('lap_time')
        .eq('track_id', form.trackId)
        .eq('variant_name', form.variant)
        .eq('gender', form.gender)
        .order('lap_time', { ascending: true });

      const position = allRankings.findIndex(l => l.lap_time === cleanTime) + 1;
      const trackObj = ALL_TRACKS.find(t => t.id === parseInt(form.trackId));

      // 4. DISCORD WEBHOOK
      await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: "🏎️ NOVÝ PŘIDANÝ ČAS",
            description: `Jezdec se právě umístil na **${position}. místě**!`,
            color: 14286592,
            fields: [
              { name: "Pravé jméno", value: form.fullName, inline: true },
              { name: "Přezdívka", value: form.nickName, inline: true },
              { name: "Společně", value: `${form.gender === 'zena' ? 'Žena' : 'Muž'}${form.instagram ? ` | IG: ${form.instagram}` : ''}`, inline: true },
              { name: "Trať / Varianta", value: `${trackObj?.name} — ${form.variant}`, inline: false },
              { name: "Dosažený čas", value: `**${form.time}s**`, inline: true },
              { name: "Aktuální pořadí", value: `**${position}. místo v kat. ${form.gender === 'zena' ? 'Ženy' : 'Muži'}**`, inline: true }
            ],
            image: { url: proofUrl },
            footer: { text: "MOTORSPORTY.CZ" },
            timestamp: new Date()
          }]
        })
      });

      setStatus({ type: 'success', text: `✅ ČAS ZAPSÁN NA ${position}. MÍSTO!` });
      setTimeout(() => { setShowModal(false); setStatus({ type: '', text: '' }); fetchLaps(); }, 2000);

    } catch (err) {
      setStatus({ type: 'error', text: '❌ CHYBA: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const selectedTrackData = ALL_TRACKS.find(t => t.id === parseInt(form.trackId));

  return (
    <div className={`laptimes-page ${(showModal || previewImg) ? 'modal-active' : ''}`}>
      <div className="blur-target">
        <div className="victory-container">
          <div className="laptimes-header">
            <div className="laptimes-title-wrap">
              <h1 className="v-title">VÝSLEDKY</h1>
              <p className="v-subtitle">TOP ČASY ZE VŠECH TRATÍ</p>
            </div>
            <button className="v-add-btn" onClick={() => setShowModal(true)}>
              <span className="icon">⏱️</span> PŘIDAT ČAS
            </button>
          </div>

          <div className="v-filters">
            <div className="v-filter-item">
              <label>HlEDAT</label>
              <input
                type="text"
                placeholder="Přezdívka nebo čas..."
                value={fSearch}
                onChange={e => setFSearch(e.target.value)}
                className="v-search-input"
              />
            </div>
            <div className="v-filter-item">
              <label>TRAŤ</label>
              <select value={fTrack} onChange={e => { setFTrack(e.target.value); setFVar(''); }}>
                <option value="">VŠECHNY TRATĚ</option>
                {ALL_TRACKS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            {fTrack && (
              <div className="v-filter-item">
                <label>VARIANTA</label>
                <select value={fVar} onChange={e => setFVar(e.target.value)}>
                  <option value="">VŠECHNY VARIANTY</option>
                  {ALL_TRACKS.find(t => t.id === parseInt(fTrack))?.variants.map(v => (
                    <option key={v.id} value={v.id}>{v.id}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="v-filter-item">
              <label>KATEGORIE</label>
              <select value={fGender} onChange={e => setFGender(e.target.value)}>
                <option value="">VŠICHNI</option>
                <option value="muz">MUŽI</option>
                <option value="zena">ŽENY</option>
              </select>
            </div>
          </div>

          <div className="v-table-card">
            <div className="v-thead">
              <span>#</span><span>JEZDEC</span><span>TRAŤ / VARIANTA</span><span>DATUM</span><span className="text-right">ČAS</span><span>DŮKAZ</span>
            </div>
            <div className="v-tbody">
              {laps.filter(lap => {
                if (!fSearch) return true;
                const s = fSearch.toLowerCase();
                return lap.nick_name.toLowerCase().includes(s) || lap.lap_time.toString().includes(s);
              }).length > 0 ? laps.filter(lap => {
                if (!fSearch) return true;
                const s = fSearch.toLowerCase();
                return lap.nick_name.toLowerCase().includes(s) || lap.lap_time.toString().includes(s);
              }).map((lap, i) => (
                <div key={lap.id} className="v-trow">
                  <span className="v-gold">{i + 1}.</span>
                  <span className="v-bold">
                    {lap.real_name ? `${lap.real_name} (${lap.nick_name})` : lap.nick_name}
                    {lap.gender === 'muz' && <span style={{ color: '#00bfff', marginLeft: '8px' }}>♂</span>}
                    {lap.gender === 'zena' && <span style={{ color: '#ff69b4', marginLeft: '8px' }}>♀</span>}
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
                  <span className="v-dim">
                    {ALL_TRACKS.find(t => t.id === lap.track_id)?.name} / {lap.variant_name}
                  </span>
                  <span className="v-dim date-col">
                    {new Date(lap.created_at || Date.now()).toLocaleDateString('cs-CZ')}
                  </span>
                  <span className="v-gold v-mono">{lap.lap_time.toFixed(4)}s</span>
                  <span className="v-center">
                    {lap.proof_url && <button className="v-eye" onClick={() => setPreviewImg(lap.proof_url)}>📷</button>}
                  </span>
                </div>
              )) : <div className="v-empty-row">Žádné časy pro tento výběr.</div>}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="v-modal-overlay">
          <div className="v-modal-box">
            <button className="v-close" onClick={() => setShowModal(false)} aria-label="Zavřít">×</button>
            <h2 className="v-neon">PŘIDAT REKORD</h2>

            {status.text && <div className={`v-status ${status.type}`}>{status.text}</div>}

            <form onSubmit={handleVerifyAndSubmit} className="v-form">
              <div className="v-form-row">
                <input type="text" placeholder="CELÉ JMÉNO" required onChange={e => setForm({ ...form, fullName: e.target.value })} />
                <input type="text" placeholder="NICK NA LÍSTKU (PŘESNĚ)" required onChange={e => setForm({ ...form, nickName: e.target.value })} />
              </div>

              <div className="v-form-row">
                <input type="text" placeholder="INSTAGRAM (VOLITELNÉ)" onChange={e => setForm({ ...form, instagram: e.target.value })} />
                <select required onChange={e => setForm({ ...form, gender: e.target.value })} value={form.gender}>
                  <option value="muz">MUŽ</option>
                  <option value="zena">ŽENA</option>
                </select>
              </div>

              <select required onChange={e => setForm({ ...form, trackId: e.target.value, variant: '' })}>
                <option value="">VYBER TRAŤ</option>
                {ALL_TRACKS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>

              <select required disabled={!form.trackId} onChange={e => setForm({ ...form, variant: e.target.value })}>
                <option value="">VYBER VARIANTU</option>
                {selectedTrackData?.variants.map(v => <option key={v.id} value={v.id}>{v.id}</option>)}
              </select>

              <input type="text" placeholder="ČAS (např. 30.745)" required onChange={e => setForm({ ...form, time: e.target.value })} />

              <div className="v-file-group">
                <label>FOTO LÍSTKU / MONITORU</label>
                <input type="file" accept="image/*" required onChange={e => setForm({ ...form, file: e.target.files[0] })} />
              </div>

              <div className="v-consent">
                <label>
                  <input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} />
                  <span>
                    Souhlasím se zpracováním <button type="button" className="inline-link" onClick={() => setShowPrivacy(true)}>osobních údajů</button> a zveřejněním v žebříčku motorsporty.
                  </span>
                </label>
              </div>

              <button type="submit" className="v-submit" disabled={loading}>
                {loading ? 'AI KONTROLA...' : 'VERIFIKOVAT A ODESLAT'}
              </button>
            </form>
          </div>
        </div>
      )}

      {previewImg && (
        <div className="v-modal-overlay" onClick={() => setPreviewImg(null)}>
          <div className="v-preview-container">
            <img src={previewImg} className="v-preview-img" alt="Důkaz" />
            <p className="v-preview-hint">KLIKNI KAMKOLIV PRO ZAVŘENÍ</p>
          </div>
        </div>
      )}

      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </div>
  );
}

export default LaptimesPage;