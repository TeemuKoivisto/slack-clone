import React from "react";
import { Link } from "react-router";
import Login from "components/auth/Login";
import AnonLogin from "components/auth/AnonLogin";
import GoogleOauth from "components/auth/GoogleOauth";

export default class FrontPage extends React.Component {

  handleChange(type, event) {

  }

  handleClick(type, event) {

  }

  render() {
    return (
      <div id="front-page">
        <section>
          <h1>Craziest slack clone!</h1>
          <p>With the gayest functionality.</p>
        </section>
        <section>
          <Login></Login>
          <AnonLogin></AnonLogin>
          <GoogleOauth></GoogleOauth>
        </section>
      </div>
    );
  }
}
