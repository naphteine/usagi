import React from "react";
import "./SideBar.css";

const SideBar = (props) => {
  return (
    <nav className="sideBar">
      {props.entries.map((item) => (
        <div>{item.header}</div>
      ))}
    </nav>
  );
};

export default SideBar;
