import React from "react";

export class UserShow extends React.Component {

  constructor() {
    super();
  }

  render() {
    const { User } = this.props;
    return (
      <div className="ui form">
        <div className="two fields">
          <div className="field">
            <h2 className="ui dividing header">Your information</h2>
            <div className="ui list">
              <div>
                <i className="user icon"></i>
                <input disabled="true" value={ `${User.firstname || ""} ${User.lastname || ""}` }></input>
                <label>Fullname</label>
              </div>
              <div>
                <input disabled="true" value={ User.nick }></input>
                <label>Nick</label>
              </div>
              <div>
                <i className="mail icon"></i>
                <input disabled="true" value={ User.email }></input>
                <label>Email</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";
// import { updateUser } from "./user.actions";

const mapStateToProps = (state) => {
  return {
    User: state.get("auth").get("user").toJS(),
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   updateUser(data) {
//     dispatch(updateUser(data));
//   },
// });

export default connect(mapStateToProps, null)(UserShow);
