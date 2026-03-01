/* src/App.jsx */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import TracksPage from './TracksPage';
import TrackDetail from './TrackDetail';
import LaptimesPage from './LaptimesPage'; // TENTO ŘÁDEK CHYBĚL
import Footer from './Footer';
import './App.css';
import { Analytics } from "@vercel/analytics/next"

function App() {
  return (
    <Router>
      <div className="victory-page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Routes>
          <Route path="/" element={<TracksPage />} />
          <Route path="/trat/:trackId" element={<TrackDetail />} />
          <Route path="/casy" element={<LaptimesPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;