import React from "react";
import "../styles/Navbar.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="nav--home">
        <img className="nav--logo" src={logo} />
        <h1>EzBots</h1>
      </Link>

      <ul>
        <li>
          <Link to="/auth" className="nav--link">
            Auth
          </Link>
        </li>
        <li>Developers</li>
      </ul>
    </div>
  );
};

export default Navbar;
