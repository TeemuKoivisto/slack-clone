import React from "react";
import moment from "moment";

export class ChatContainer extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    this.updateScrollBar();
  }

  componentDidUpdate() {
    this.updateScrollBar();
  }

  updateScrollBar() {
    if (this.refs.chatAreaMessages) {
      const el = this.refs.chatAreaMessages;
      el.scrollTop = el.scrollHeight;
    }
  }

  handleChange(name, event) {
    this.props.updateForm(name, event.target.value);
  }

  handleKeyPress(target) {
    // if enter
    if (target.charCode === 13 && this.props.currentRoomId && this.props.isFormValid("chatMessageForm")) {
      // console.log("yee", this.props.form)
      // add current user to the payload? also the chat-room id?
      // console.log(this.props.user)
      const msg = this.props.form.values;
      msg.User = this.props.user._id;
      msg.authorNick = this.props.user.nick;
      msg.Room = this.props.currentRoomId;
      this.props.saveMessage(msg);
      this.props.resetForm();
    }
  }

  handleClick(name, index, event) {
    if (name === "selectRoom") {
      const room = this.props.rooms.find(room => room._id === index);
      const joined = room.users.find(user => user._id === this.props.user._id);
      if (joined) {
        this.props.selectRoom({
          _id: index
        })
      }
    } else if (name === "joinRoom") {
      this.props.joinRoom({
        room: { 
          _id: index 
        }
      })
    } else if (name === "leaveRoom") {
      this.props.leaveRoom({
        room: { 
          _id: index 
        }
      })
    }
    // this.props.getMessages();
  }

  render() {
    const { currentRoomId, rooms } = this.props;
    const currentRoom = rooms.find(room => room._id === currentRoomId);
    let messages = [], users = [];
    if (currentRoom) {
      messages = currentRoom.messages;
      users = currentRoom.users;
    }
    console.log(users)
    const { content } = this.props.form.values;
    return (
      <div>
        <div className="chat-container">
          <div className="chat-container-top">
            <p>The incredible chat-application</p>
          </div>
          <div className="chat-container-middle">
            <div className="chat-rooms">
              <ul>
                { rooms.map(room =>
                  <li key={room._id}>
                    <span
                      className={ currentRoomId === room._id ? "selected-room" : "unselected-room"}
                      onClick={this.handleClick.bind(this, "selectRoom", room._id)}
                    >
                      { room.name }
                    </span>
                    { room.users.find(user => user._id === this.props.user._id) ?
                      <button onClick={this.handleClick.bind(this, "leaveRoom", room._id)}>Leave</button>
                        :
                      <button onClick={this.handleClick.bind(this, "joinRoom", room._id)}>Join</button>
                    }
                  </li>
                )}
              </ul>
            </div>
            <div className="chat-area">
              <div ref="chatAreaMessages" className="chat-area-messages">
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
                value={content}
              ></input>
            </div>
            <div className="chat-users">
              <ul>
                { users.map(user =>
                  <li key={user._id}>
                    <span>
                      { user.nick }
                    </span>
                  </li>
                )}
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
import { getRoom, selectRoom, joinRoom, leaveRoom } from "actions/room";
import { getMessages, saveMessage } from "actions/message";

const mapStateToProps = (state) => {
  return {
    user: state.get("auth").get("user").toJS(),
    currentRoomId: state.get("auth").get("currentRoomId"),
    rooms: state.get("room").get("rooms").toJS(),
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
  },
  joinRoom(data) {
    dispatch(joinRoom(data));
    dispatch(getRoom(data));
  },
  leaveRoom(data) {
    dispatch(leaveRoom(data));
  }
});

export default createForm({
  name: "chatMessageForm",
  schema: "messageSave",
})(connect(mapStateToProps, mapDispatchToProps)(ChatContainer))
