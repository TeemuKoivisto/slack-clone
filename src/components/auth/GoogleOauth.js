import React from "react";
import GoogleLogin from 'react-google-login';

export class GoogleOauth extends React.Component {

  oAuth2TokenGet() {
    // TODO: First try to get the token from sessionStorage here

    // Build the oauth request url
    const responseType = 'token';
    const clientId = "227681006174-llv3o4572pa8qj6sj754spu5pnf87ve8.apps.googleusercontent.com";
    const redirectUri = 'http://localhost:3333/user/me';
    // const redirectUri = 'http://localhost:3332/oauth/google';
    const scope = 'openid email profile';
    const prompt = 'select_account';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&prompt=${prompt}`;

    // Open a new window
    const win = window.open(url, 'name', 'height=600,width=450');
    if (win) win.focus();

    const pollTimer = window.setInterval(() => {
      try {
        if (!!win && win.location.href.indexOf(redirectUri) !== -1) {
          window.clearInterval(pollTimer);

          // Get the URL hash with your token in it
          const hash = win.location.hash;
          console.log("yo hash", hash)
          // win.close();

          // Parse the string hash and convert to object of keys and values
          const result = hash.substring(1)
            .split('&')
            .map(i => i.split('='))
            .reduce((prev, curr) => ({
              ...prev,
              [curr[0]]: curr[1],
            }), {});

          // Calculate when the token expires and store in the result object
          result.expires_at = Date.now() + parseInt(hash.expires_in, 10);

          //  TODO: Persist result in sessionStorage here
        }
      } catch (err) {
        // do something or nothing if window still not redirected after login
      }
    }, 100);
  }

  // const responseGoogle = (response) => {
  //   console.log(response);
  // }

  responseGoogle2(res) {
    console.log(res)
    this.props.verifyUser({
      type: "google",
      googleId: res.googleId,
      accesssToken: res.accesssToken,
      profileObj: res.profileObj,
    });
  }

  render() {
    return (
      <section>
        <h2>Login with Google</h2>
        <GoogleLogin
          clientId="227681006174-llv3o4572pa8qj6sj754spu5pnf87ve8.apps.googleusercontent.com"
          className="google-login"
          onSuccess={this.responseGoogle2.bind(this)}
          onFailure={this.responseGoogle2.bind(this)}
        >
          <span className="ion-social-googleplus"></span>Sign in with Google        
        </GoogleLogin>
      </section>
    )
  }
}

import { connect } from "react-redux";

import { verifyUser } from "actions/auth";

const mapStateToProps = (state) => {
  return {
    user: state.get("auth").get("user"),
    loading: state.get("auth").get("loading"),
  };
};

const mapDispatchToProps = (dispatch) => ({
  verifyUser(data) {
    dispatch(verifyUser(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleOauth);
