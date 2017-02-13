import "./nav.scss";

import React from "react";
import { browserHistory, Link } from "react-router";

export class NavBar extends React.Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    if (this.props.user.role === "anon") {
      this.props.logoutAnon(this.props.user);
    } else {
      this.props.logout();
    }
    browserHistory.push("/login");
  }

  renderNonLoggedNav() {
    return (
      <div className="navbar navbar-inverse navbar-fixed-top pohina-pad" id="navbar">
        <div className="container">
          <div className="navbar-header">
            <Link to="/">
              <img className="pohina-navbar-logo" src="img/elo_logo.png" />
            </Link>
            <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="navbar-collapse collapse" id="navbar-main">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">Frontpage</Link>
              </li>

              <li>
                <Link to="/user/me">Me</Link>
              </li>

              <li>
                <Link to="/chat">Chat</Link>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>

          </div>
        </div>
      </div>
    );
  }

  renderUserNav() {
    const { user } = this.props;
    return (
      <div className="navbar navbar-inverse navbar-fixed-top pohina-pad" id="navbar">
        <div className="container">
          <div className="navbar-header">
            <Link to="/">
              <img className="pohina-navbar-logo" src="img/elo_logo.png" />
            </Link>
            <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="navbar-collapse collapse" id="navbar-main">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">Frontpage</Link>
              </li>

              <li>
                <Link to="/user/me">{ user.nick }</Link>
              </li>

              <li>
                <Link to="/chat">Chat</Link>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a className="item" onClick={ this.handleLogout }>Logout</a>
              </li>
            </ul>

          </div>
        </div>
      </div>
    );
  }

  renderAnonNav() {
    const { user } = this.props;
    return (
      <div className="navbar navbar-inverse navbar-fixed-top pohina-pad" id="navbar">
        <div className="container">
          <div className="navbar-header">
            <Link to="/">
              <img className="pohina-navbar-logo" src="img/elo_logo.png" />
            </Link>
            <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="navbar-collapse collapse" id="navbar-main">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">Frontpage</Link>
              </li>

              <li>
                <Link to="/user/me">{ user.nick }</Link>
              </li>

              <li>
                <Link to="/chat">Chat</Link>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a className="item" onClick={ this.handleLogout }>Logout</a>
              </li>
            </ul>

          </div>
        </div>
      </div>
    );
  }

  renderAdminNav() {
    const { user } = this.props;
    return (
      <div className="navbar navbar-inverse navbar-fixed-top pohina-pad" id="navbar">
        <div className="container">
          <div className="navbar-header">
            <Link to="/">
              <img className="pohina-navbar-logo" src="img/elo_logo.png" />
            </Link>
            <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="navbar-collapse collapse" id="navbar-main">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">Frontpage</Link>
              </li>

              <li>
                <Link to="/user/me">{ user.firstname }</Link>
              </li>

              <li>
                <Link to="/chat">Chat</Link>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a className="item" onClick={ this.handleLogout }>Logout</a>
              </li>
            </ul>

          </div>
        </div>
      </div>
    );
  }

  renderNav() {
    const isAdmin = this.props.user.role === "admin";
    if (this.props.user.role === "admin") {
      return (
        <div>
          { this.renderAdminNav() }
        </div>
      );
    } else if (this.props.user.role === "anon") {
      return (
        <div>
          { this.renderAnonNav() }
        </div>
      );
    }
    return (
      <div>
        { this.renderUserNav() }
      </div>
    );
  }

  render() {
    const loggedIn = this.props.user.role !== undefined;
    return (
      <div id="nav">
        { loggedIn ? this.renderNav() : this.renderNonLoggedNav() }
      </div>
    );
  }
}

import { connect } from "react-redux";

import { logout, logoutAnon } from "actions/auth";
import { disconnectSocket } from "actions/socket";

const mapStateToProps = (state) => {
  return {
    user: state.get("auth").get("user").toJS(),
    // user: state.get("auth.user"),
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout() {
    dispatch(disconnectSocket());
    dispatch(logout());
  },
  logoutAnon(data) {
    dispatch(logoutAnon(data));
    dispatch(disconnectSocket());
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
