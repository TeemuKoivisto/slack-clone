import React from "react";
import { Link } from "react-router";

export default class FrontPage extends React.Component {

  renderOwlDots() {
    return(
      <div className="owl-dots" style="">
        <div className="owl-dot">
          <span></span>
        </div>
        <div className="owl-dot">
          <span></span>
        </div>
        <div className="owl-dot">
          <span></span>
        </div>
        <div className="owl-dot">
          <span></span></div>
        <div className="owl-dot active">
          <span></span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="front-page">
        <section>
          <h1>The front page of MyApp!</h1>
          <p>It is nested inside App-component and it looks cool :D. Well not really.</p>
        </section>
      </div>
    );
  }
}
