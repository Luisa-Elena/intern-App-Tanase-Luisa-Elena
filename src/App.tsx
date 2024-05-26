import { NavLink, Outlet, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from 'pages/home';
import Users from 'pages/users';

import logo from './assets/images/logo.webp';
import './App.scss';

const Layout = () => {
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="layout-container">
      <header className="header">
        <img alt="Company Logo" className="logo" src={logo} />
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </div>
        <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className='nav-list'>
            <li className='nav-list-item'>
              <NavLink to="/" className='navlink' onClick={toggleMobileMenu}>Home</NavLink>
            </li>
            <li className='nav-list-item'>
              <NavLink to="/users" className='navlink' onClick={toggleMobileMenu}>Users</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route element={<Home />} path="/" />
      <Route element={<Users />} path="/users" />
    </Route>
  </Routes>
);

export default App;
