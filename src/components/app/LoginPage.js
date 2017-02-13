import React from "react";
import Login from "components/auth/Login";
import AnonLogin from "components/auth/AnonLogin";
import GoogleOauth from "components/auth/GoogleOauth";

export default class LoginPage extends React.Component {

  render() {
    return (
      <div id="login-page">
        <section>
          <Login></Login>
          <AnonLogin></AnonLogin>
          {/*<GoogleOauth></GoogleOauth>*/}
        </section>
      </div>
    );
  }
}
