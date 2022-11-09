import React from "react";
import "./Main.css";

const Main = (props) => {
  return (
    <main className="mainEntry">
      {props.entries.map((item) => (
        <div>
          <h3 className="entryHeader">{item.header}</h3>
          <p className="entryText">{item.entry}</p>
          <footer className="entryFooter">
            <h6>
              {item.author} - {item.date}
            </h6>
          </footer>
        </div>
      ))}
    </main>
  );
};

export default Main;
