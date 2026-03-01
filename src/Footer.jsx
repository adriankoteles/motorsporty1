import React, { useState } from 'react';
import PrivacyModal from './PrivacyModal';
import './Footer.css';

export default function Footer() {
    const [showPrivacy, setShowPrivacy] = useState(false);

    return (
        <>
            <footer className="v-footer">
                <div className="victory-container">
                    <p>
                        © 2026 Victory Circle |{' '}
                        <button className="footer-link" onClick={() => setShowPrivacy(true)}>
                            Ochrana údajů
                        </button>{' '}
                    </p>
                </div>
            </footer>
            {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
        </>
    );
}
