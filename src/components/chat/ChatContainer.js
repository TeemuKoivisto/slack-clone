import React from "react";

export class ChatContainer extends React.Component {

  constructor() {
    super();
  }

  handleChange(name, event) {
    this.props.updateForm(name, event.target.value);
  }

  handleKeyPress(target) {
    // if enter
    console.log("yo")
    if (target.charCode === 13 && this.props.isFormValid("chatMessageForm")) {
      console.log("yee")
      // add current user to the payload? also the chat-room id?
      this.props.saveMessage(this.props.getForm("chatMessageForm").values);
    }
  }

  render() {
    const { messages } = this.props;
    return (
      <div>
        <div className="chat-container">
          <div className="chat-container-top">
            <p>stuff goes here</p>
          </div>
          <div className="chat-container-middle">
            <div className="chat-rooms">
              <ul>
                <li>room 1</li>
                <li>room 2</li>
                <li>room 3</li>
              </ul>
            </div>
            <div className="chat-area">
              <div className="chat-area-messages">
                <ul>
                  { messages.map(msg =>
                    <li className="chat-area-message" key={msg.id}>
                      <span className="chat-message-time">{ `${msg.created.getHours()}:${msg.created.getMinutes()}`}</span>
                      <span className="chat-message-author">{ `${msg.user.name}:`}</span>
                      <span className="chat-message-content">{ `${msg.content}` }</span>
                    </li>
                  )}
                </ul>
              </div>
              <input className="chat-area-input"
                onChange={this.handleChange.bind(this, "content")}
                onKeyPress={this.handleKeyPress.bind(this)}
              ></input>
            </div>
            <div className="chat-users">
              <ul>
                <li>user 1</li>
                <li>user 2</li>
                <li>user 3</li>
              </ul>
            </div>
          </div>
          <div className="chat-container-bottom">
            <p>some cool features here</p>
          </div>
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";
import createForm from "react-form-validate/CreateForm";
import { saveMessage } from "actions/message";

const mapStateToProps = (state) => {
  return {
    // user: state.auth.user,
    // room: state.room.current,
    messages: state.message.messages,
  };
};

const mapDispatchToProps = (dispatch) => ({
  saveMessage(data) {
    dispatch(saveMessage(data));
  },
});

export default createForm({
  name: "chatMessageForm",
  schema: "messageSave",
})(connect(mapStateToProps, mapDispatchToProps)(ChatContainer))
