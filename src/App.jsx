/* src/App.jsx */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import TracksPage from './TracksPage';
import TrackDetail from './TrackDetail';
import LaptimesPage from './LaptimesPage'; // TENTO ŘÁDEK CHYBĚL
import './App.css';

function App() {
  return (
    <Router>
      <div className="victory-page">
        <Header />
        <Routes>
          <Route path="/" element={<TracksPage />} />
          <Route path="/trat/:trackId" element={<TrackDetail />} />
          <Route path="/casy" element={<LaptimesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;