import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="App-header">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h2>Usagi Sözlük</h2>
          </div>
          <div className="col-4">
            <input className="search" placeholder="Ara..."></input>
          </div>
          <div className="col-4">
            <a href="#!" className="btn btn-primary align-end">
              Giriş
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
