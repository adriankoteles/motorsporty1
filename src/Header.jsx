/* src/Header.jsx */
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>DOMŮ</NavLink>
        <NavLink to="/akademie" className={({ isActive }) => isActive ? 'active' : ''}>AKADEMIE</NavLink>
        <NavLink to="/aplikace" className={({ isActive }) => isActive ? 'active' : ''}>APLIKACE</NavLink>
        <NavLink to="/trate" className={({ isActive }) => isActive ? 'active' : ''}>TRATĚ</NavLink>
        <NavLink to="/casy" className={({ isActive }) => isActive ? 'active' : ''}>ČASY</NavLink>
      </div>
    </nav>
  );
}

export default Header;