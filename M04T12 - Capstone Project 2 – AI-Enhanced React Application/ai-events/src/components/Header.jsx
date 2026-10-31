import {useState} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.jsx';

export default function Header() {
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/login');
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand" onClick={closeMenu}>Event Planner</Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <nav id="main-nav" className={`nav${menuOpen ? ' nav--open' : ''}`}>
          {user ? (
            <>
              <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
              <NavLink to="/events/new" onClick={closeMenu}>Add Event</NavLink>
              <NavLink to="/help" onClick={closeMenu}>Help</NavLink>
              <button type="button" className="btn btn--ghost"
                onClick={handleLogout}>
                Log out ({user.username})
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={closeMenu}>Log in</NavLink>
              <NavLink to="/register" onClick={closeMenu}>Register</NavLink>
              <NavLink to="/help" onClick={closeMenu}>Help</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
