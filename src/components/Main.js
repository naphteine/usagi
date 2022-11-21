import React from "react";
import "./Main.css";

const Main = (props) => {
  return (
    <main className="mainEntry">
      {props.entries.map((item) => (
        <article className="entry">
          <h3 className="entryHeader">{item.header}</h3>
          <section className="entryContent">
            <p className="entryText">{item.entry}</p>
            <footer className="entryFooter">
              <h6>
                {item.author} - {item.date}
              </h6>
            </footer>
          </section>
        </article>
      ))}
    </main>
  );
};

export default Main;
