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
          <p>With the silliest functionality.</p>
        </section>
        <section>
          <p>It was built with React+Redux, Node (Express), Socket.io, JWT and MongoDB.</p>
          <p>Also routing with socket.io inside Express was a huge pain the butt to build.</p>
        </section>
      </div>
    );
  }
}
