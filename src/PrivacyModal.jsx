import React from 'react';
import './PrivacyModal.css';

export default function PrivacyModal({ onClose }) {
    return (
        <div className="p-modal-overlay" onClick={onClose}>
            <div className="p-modal-box" onClick={(e) => e.stopPropagation()}>
                <button className="p-close" onClick={onClose}>×</button>
                <h2>OCHRANA OSOBNÍCH ÚDAJŮ</h2>
                <div className="p-content">
                    <h3>1. Kdo je správcem tvých údajů?</h3>
                    <p>Správcem údajů pro projekt Victory Circle je Adrian Koteles (Motorsporty). Pokud máš jakýkoliv dotaz nebo chceš svá data smazat, napiš na: adrikoteles@gmail.com.</p>

                    <h3>2. Jaká data sbíráme a proč?</h3>
                    <p>Abychom mohli provozovat férový a přehledný žebříček, potřebujeme od tebe tyto údaje:</p>
                    <ul>
                        <li><strong>Jméno a příjmení:</strong> Pro interní evidenci a identifikaci jezdce.</li>
                        <li><strong>Přezdívka (Nick):</strong> Jméno, které se veřejně zobrazuje v žebříčku.</li>
                        <li><strong>Pohlaví:</strong> Pro budoucí rozdělení statistik a kategorií.</li>
                        <li><strong>Instagram (dobrovolný):</strong> Pro propojení s tvým profilem a budování komunity.</li>
                        <li><strong>Čas kola (Lap Time):</strong> Hlavní údaj pro umístění v žebříčku.</li>
                        <li><strong>Fotografie lístku/obrazovky:</strong> Slouží výhradně jako důkaz pravosti dosaženého času.</li>
                    </ul>

                    <h3>3. Právní základ zpracování</h3>
                    <p>Tvá data zpracováváme na základě tvého dobrovolného souhlasu, který nám uděluješ zaškrtnutím políčka před odesláním formuláře. Bez tohoto souhlasu tě nemůžeme do žebříčku zařadit.</p>

                    <h3>4. Kdo další má k datům přístup?</h3>
                    <p>Tvá data nikomu neprodáváme. Pro fungování systému ale využíváme tyto nástroje:</p>
                    <ul>
                        <li><strong>Supabase:</strong> Zabezpečená cloudová databáze, kde jsou uloženy všechny záznamy.</li>
                        <li><strong>Discord:</strong> Vybrané údaje (přezdívka, čas a fotografie lístku) jsou automaticky odesílány na náš interní server pro potřeby moderace a kontroly pravosti.</li>
                    </ul>

                    <h3>5. Jak dlouho data uchováváme?</h3>
                    <p>Data uchováváme po dobu existence projektu Victory Circle nebo do chvíle, než se rozhodneš svůj souhlas odvolat a požádat o smazání.</p>

                    <h3>6. Tvá práva</h3>
                    <p>Máš plnou kontrolu nad svými údaji. Kdykoliv máš právo na:</p>
                    <ul>
                        <li><strong>Přístup:</strong> Vědět, co o tobě evidujeme.</li>
                        <li><strong>Opravu:</strong> Upravit své jméno nebo nick.</li>
                        <li><strong>Smazání (Právo být zapomenut):</strong> Stačí napsat na výše uvedený e-mail a my tvůj záznam i s fotkou kompletně odstraníme.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
