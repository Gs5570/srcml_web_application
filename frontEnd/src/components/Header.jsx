import '../styles/header.css';
import logo from '/media/RIT_rgb_hor_k.svg';

import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { IoMdMenu } from 'react-icons/io';

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);

  const navLinkStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bolder' : 'normal',
      boxShadow: isActive ? 'rgb(247 105 2) 0px 5px 15px' : 'none',
      textDecoration: isActive ? 'none' : 'none',
      padding: isActive ? '10px' : '0',
      borderRadius: isActive ? '20px' : '0',
      color: isActive ? 'inherit' : 'black',
    };
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="header-container">
      <div className="logo-container">
        <img src={logo} alt="logo" />
      </div>
      <div className="nav-and-search-container">
        <div
          className={`hamburger-menu ${menuActive ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <IoMdMenu size={40} />
        </div>
        <nav>
          <ul className={`menu-container ${menuActive ? 'active' : ''}`}>
            <li>
              <NavLink to="/" style={navLinkStyle}>
                Tool
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" style={navLinkStyle}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" style={navLinkStyle}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/tutorial" style={navLinkStyle}>
                Tutorial
              </NavLink>
            </li>
            <li>
              <NavLink to="/Login" style={navLinkStyle}>
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* <div className="search-container">
          <p>search icon</p>
        </div> */}
      </div>
    </div>
  );
}
