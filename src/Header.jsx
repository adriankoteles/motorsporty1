/* src/Header.jsx */
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>DOMŮ</NavLink>
        <NavLink to="/casy" className={({ isActive }) => isActive ? 'active' : ''}>ČASY</NavLink>
      </div>
    </nav>
  );
}

export default Header;