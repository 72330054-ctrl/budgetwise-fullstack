import React, { useState } from 'react';
import logo from '../assets/log.png';
import { BsList } from 'react-icons/bs';
import { AuthProvider, useAuth } from '../pages/AuthContext';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import NotificationBell from './notifyme';
function NavBar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const { user, logout, login } = useAuth();
  if (user) {
    return (
      <header id="header" className="header d-flex align-items-center sticky-top  " >
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

          <div className="d-flex align-items-center">

            <h1 className="sitename mb-0 text-light" style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 'bolder' }}>Budget<span style={{ color: '#22cba7', fontSize: '20px' }}>Wise</span></h1>
          </div>

          {/* Desktop Menu */}
          <nav className="navmenu d-none d-xl-flex">
            <ul className="d-flex list-unstyled mb-0">
              <li className="mx-2">
                <NavLink
                  to="/"
                  className={({ isActive }) => isActive ? "active " : ""}
                  style={{ fontSize: "1.2rem" }} // bigger font
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown mx-2">
                <button
                  className="btn btn-link nav-link dropdown-toggle text-light p-0"
                  id="settingsDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded={isDropdownOpen}
                >
                  Settings
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="settingsDropdown"
                >
                  {[
                    { to: "/categories", label: "Categories" },
                    { to: "/transaction", label: "Transaction" },
                    { to: "/transformation", label: "TransFormations" },

                    { to: "/budget", label: "Budget" },
                  ].map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        className="dropdown-item"
                        onClick={() => setIsDropdownOpen(false)}
                        style={({ isActive }) => ({
                          color: isActive ? "green" : "",
                          fontWeight: isActive ? "bold" : "normal",
                          backgroundColor: "transparent !important"
                        })}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>

              {user.role === 'admin' && (
                <li className="mx-2">
                  <NavLink
                    to="/admin"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    style={{ fontSize: "1.2rem" }}
                  >
                    Admin
                  </NavLink>
                </li>
              )}



              <li className="mx-2">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => isActive ? "active " : ""}
                  style={{ fontSize: "1.2rem" }}
                >
                  Dashboard
                </NavLink>
              </li>


              <li className="mx-2">
                <NavLink
                  to={`/notification/${user?.id}`}
                  className={({ isActive }) =>
                    isActive ? "nav-link active d-flex align-items-center gap-2" : "nav-link d-flex align-items-center gap-2"
                  }
                >
                  <span>Notification</span>
                  <NotificationBell />
                </NavLink>
              </li>

              <li className="mx-2">
                <NavLink
                  to="/acounts"
                  className={({ isActive }) => isActive ? "active " : ""}
                  style={{ fontSize: "1.2rem" }}
                >
                  Acounts
                </NavLink>
              </li>

              {/* Logout never active */}
              <li className="mx-2">
                <button
                  onClick={logout}
                  className="btn p-0 text-light d-flex align-items-center gap-2"
                  style={{ fontSize: "1.2rem" }}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </li>


            </ul>
          </nav>



          {/* Mobile toggle button */}
          <button
            className="mobile-nav-toggle d-xl-none btn "
            onClick={toggleMenu}
          >
            <BsList size={24} />

          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu d-xl-none position-absolute w-100 bg-light p-3 ${isOpen ? 'show' : ''}`} style={{ top: '100%', left: 0 }}>
          <ul className="list-unstyled mb-0">
            <li className="mb-2"><NavLink className={({ isActive }) => isActive ? "active " : ""} to="/" onClick={toggleMenu}>Home</NavLink></li>
            <li className="mb-2"><NavLink className={({ isActive }) => isActive ? "active " : ""} to="/dashboard" onClick={toggleMenu}>Dashboard</NavLink></li>
            <li className="mb-2"><NavLink className={({ isActive }) => isActive ? "active " : ""} to="/Contact" onClick={toggleMenu}>Contact</NavLink></li>

          </ul>
        </div>
      </header>
    )
  }
  return (

    <header id="header" className="header d-flex align-items-center sticky-top  " style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

        {/* Logo */}
        <div className="d-flex align-items-center">
          {/* <img
            src={logo}
            alt="Logo"
            style={{ maxWidth: '100px', marginRight: '10px' }}
          /> */}
          <h1 className="sitename mb-0" style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 'bolder' }}>Budget<span style={{ color: '#22cba7', fontSize: '20px' }}>Wise</span></h1>
        </div>

        {/* Desktop Menu */}
        <nav className="navmenu d-none d-xl-flex">
          <ul className="d-flex list-unstyled mb-0">
            <li className="mx-2"><NavLink className={({ isActive }) => isActive ? "active " : ""} to="/">Home</NavLink></li>
            <li className="mx-2"><NavLink className={({ isActive }) => isActive ? "active " : ""} to="/dashboard">Dashboard</NavLink></li>
            <li className="mx-2"><NavLink className={({ isActive }) => isActive ? "active " : ""} to="/Contact">Contact</NavLink></li>
            <li className="mx-2"><NavLink className={({ isActive }) => isActive ? "active " : ""} to="/login">Login</NavLink></li>
          </ul>
        </nav>

        {/* Mobile toggle button */}
        <button
          className="mobile-nav-toggle d-xl-none btn "
          onClick={toggleMenu}
        >
          <BsList size={24} />

        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu d-xl-none position-absolute w-100 bg-light p-3 ${isOpen ? 'show' : ''}`} style={{ top: '100%', left: 0 }}>
        <ul className="list-unstyled mb-0">
          <li className="mb-2"><NavLink className={({ isActive }) => isActive ? "active " : ""} to="/" onClick={toggleMenu}>Home</NavLink></li>
          <li className="mb-2"><NavLink className={({ isActive }) => isActive ? "active " : ""} to="/dashboard" onClick={toggleMenu}>Dashboard</NavLink></li>
          <li className="mb-2"><NavLink className={({ isActive }) => isActive ? "active " : ""} to="/Contact" onClick={toggleMenu}>Contact</NavLink></li>
        </ul>
      </div>
    </header>
  );
}

export default NavBar;