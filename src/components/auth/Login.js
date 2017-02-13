import React from "react";
import { browserHistory } from "react-router";

export class Login extends React.Component {

  handleClick(name, event) {
    event.preventDefault();
    // this.props.resetForm(name);
  }

  handleChange(name, event) {
    // event.preventDefault();
    this.props.updateForm(name, event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.isFormValid()) {
      const { email, password } = this.props.form.values;
      this.props.loginUser(email, password);
    }
  }

  render() {
    const { loading } = this.props;
    // console.log("rendering, props: ", this.props)
    const { email, password } = this.props.form.values;
    // console.log(this.props.form.values)
    const { errors } = this.props.form;
    return (
      <form className="ui middle aligned center aligned grid" onSubmit={this.handleSubmit.bind(this)}>
        <h2>Login with regular account</h2>
        <p>Use admin@asdf.asdf & asdf or user@asdf.asdf & asdf</p>
        <div className="ui">
          <div className="ui large form">
            <div className="ui stacked segment">
              <div className="field error">
                <div className="ui left icon input">
                  <i className="mail icon"></i>
                  <input
                    type="text"
                    name="email"
                    placeholder="E-mail address"
                    value={email}
                    onChange={this.handleChange.bind(this, "email")}
                  />
                </div>
                <div>{ errors.email ? errors.email.map((err, index) => <div key={index}>{err}</div>) : <span></span> }</div>
              </div>
              <div className="field error">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handleChange.bind(this, "password")}
                  />
                </div>
                <div>{ errors.password ? errors.password.map((err, index) => <div key={index}>{err}</div>) : <span></span> }</div>
              </div>
            </div>
            { loading ?
              <div className="ui blue active centered inline loader"></div>
                :
              <div>
                <button className="ui fluid large blue submit button" type="submit">Log In</button>
                <button className="ui fluid large blue submit button" onClick={this.handleClick.bind(this, "reset")}>Reset</button>
              </div>
            }
          </div>
        </div>
      </form>
    );
  }
}

import { connect } from "react-redux";

import { loginUser } from "actions/auth";

const mapStateToProps = (state) => {
  return {
    user: state.get("auth").get("user"),
    loading: state.get("auth").get("loading"),
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginUser(email, password) {
    dispatch(loginUser(email, password));
  },
});

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

import createForm from "react-form-validate/CreateForm";

// const LoginWithForm = createForm({
//   form: "loginForm",
//   model: "loginUser",
// })(Login)
//
// export default connect(mapStateToProps, mapDispatchToProps)(LoginWithForm)

export default createForm({
  name: "loginForm",
  schema: "userLogin",
})(connect(mapStateToProps, mapDispatchToProps)(Login))
