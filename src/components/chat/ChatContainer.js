import React from "react";
import moment from "moment";

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
      console.log("yee", this.props.form)
      // add current user to the payload? also the chat-room id?
      console.log(this.props.user)
      const msg = this.props.form.values;
      msg.User = this.props.user._id;
      msg.authorNick = this.props.user.nick;
      msg.Room = this.props.currentRoom._id;
      this.props.saveMessage(msg);
    }
  }

  handleClick(name, index, event) {
    if (name === "selectRoom") {
      console.log(index)
      this.props.selectRoom({
        _id: index
      })
    }
    this.props.getMessages();
  }

  render() {
    const { currentRoom, rooms } = this.props;
    const messages = currentRoom.messages ? currentRoom.messages : [];
    console.log(currentRoom)
    // console.log(currentRoom._id === rooms[0]._id)
    return (
      <div>
        <div className="chat-container">
          <div className="chat-container-top">
            <p>stuff goes here</p>
          </div>
          <div className="chat-container-middle">
            <div className="chat-rooms">
              <ul>
                { rooms.map(room =>
                  <li key={room._id}
                    className={ currentRoom._id === room._id ? "selected-room" : "unselected-room"}
                    onClick={this.handleClick.bind(this, "selectRoom", room._id)}
                  >
                    { room.name }
                  </li>
                )}
              </ul>
            </div>
            <div className="chat-area">
              <div className="chat-area-messages">
                <ul>
                  { messages.map(msg =>
                    <li className="chat-area-message" key={msg._id}>
                      <span className="chat-message-time">{ `${moment(msg.created).format("HH:mm")}`}</span>
                      <span className="chat-message-author">{ `${msg.authorNick}:`}</span>
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
            <button onClick={this.handleClick.bind(this, "msg")}>Get</button>
          </div>
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";
import createForm from "react-form-validate/CreateForm";
import { selectRoom } from "actions/room";
import { getMessages, saveMessage } from "actions/message";

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    currentRoom: state.room.get("currentRoom"),
    rooms: state.room.get("rooms"),
    messages: state.message.messages,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getMessages() {
    dispatch(getMessages());
  },
  saveMessage(data) {
    dispatch(saveMessage(data));
  },
  selectRoom(data) {
    dispatch(selectRoom(data));
  }
});

export default createForm({
  name: "chatMessageForm",
  schema: "messageSave",
})(connect(mapStateToProps, mapDispatchToProps)(ChatContainer))
