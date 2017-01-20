import React from "react";

export class LoginAnon extends React.Component {

  handleChange(name, event) {
    event.preventDefault();
    this.props.updateForm(name, event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.isFormValid()) {
      const { nick } = this.props.form.values;
      this.props.loginAnon({
        nick,
      });
    }
  }

  render() {
    const { loading } = this.props;
    const { nick } = this.props.form.values;
    const { errors } = this.props.form;
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h2>Login anonynousmly</h2>
        <div>
          <input
            type="text"
            name="nick"
            placeholder="Nick"
            value={nick}
            onChange={this.handleChange.bind(this, "nick")}
          />
          <label>Your nick</label>
          <div>{ errors.nick ? errors.nick.map((err, index) => <div key={index}>{err}</div>) : <span></span> }</div>
        </div>
        <div>
          { loading ?
            <div className="">Loading</div>
              :
            <button type="submit">Join</button>
          }
        </div>
      </form>
    )
  }
}

import { connect } from "react-redux";

import { loginAnon } from "actions/auth";

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginAnon(data) {
    dispatch(loginAnon(data));
  },
});

import createForm from "react-form-validate/CreateForm";

export default createForm({
  name: "loginAnonForm",
  schema: "anonLogin",
})(connect(mapStateToProps, mapDispatchToProps)(LoginAnon))
