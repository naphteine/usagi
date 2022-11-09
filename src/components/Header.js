import React from "react";
import logo from "../logo.png";
import "./Header.css";

const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Usagi Sözlük</h2>
    </header>
  );
};

export default Header;
