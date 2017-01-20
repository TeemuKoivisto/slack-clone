import React from "react";
import { Link } from "react-router";

import NavBar from "components/ui/NavBar";

export class App extends React.Component {

  componentDidMount() {
    // sets logout timer each time the app is mounted aka. window is reloaded
    // if the user is actually logged in
    console.log("yo")
    if (this.props.user.email) {
      // this.props.setLogoutTimeout();
      this.props.connectToSocket();
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <main className="main-container">
          {this.props.children}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};

import { connect } from "react-redux";
// import { setLogoutTimeout } from "ping/ping.actions";
import { connectToSocket } from "actions/socket";

const mapStateToProps = (state) => {
  const auth = state.auth;
  return {
    user: auth.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // setLogoutTimeout() {
  //   dispatch(setLogoutTimeout());
  // },
  connectToSocket() {
    dispatch(connectToSocket());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
