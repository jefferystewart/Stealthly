import React from "react";
import { browserHistory } from 'react-router';

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = { nickname: "", nicknameError:false, code:"", codeError:false };
  }

  updateNickname(e) {
    this.setState({ nickname:e.currentTarget.value });
  }

  updateCode(e) {
    this.setState({ code:e.currentTarget.value });
  }

  generateCode() {
    if (this.state.nickname.length > 0) {
      this.props.generateCode(this.state.nickname, this.redirectToChatRoom.bind(this));
      this.setState({ nicknameError:false });
    } else {
      this.setState({ nicknameError:true });
    }
  }

  redirectToChatRoom(code) {
    this.props.receiveUser(this.state.nickname);
    browserHistory.push(code);
  }

  joinChatRoom(e){
    if (this.state.code.length > 0 && this.state.code.length <= 4){
      this.props.receiveUser(this.state.nickname);
      browserHistory.push(this.state.code);
      this.setState({ codeError:false });
    } else{
      this.setState({ codeError:true });
    }
  }

  render() {
    let nicknameError, codeError;
    if (this.state.nicknameError) {
      nicknameError = (
        <p> Please pick a name! </p>
      );
    }
    if (this.state.codeError) {
      codeError = (
        <p> Not an active room! </p>
      );
    }
    return (
      <div className="menu">
        <h2>Room Code</h2>
        { codeError }
        <input onChange={ this.updateCode.bind(this) }></input>
        <h2>Name</h2>
        { nicknameError }
        <input onChange={ this.updateNickname.bind(this) }></input>
        <button onClick={ this.generateCode.bind(this) }>Create Room</button>
        <button onClick={ this.joinChatRoom.bind(this) }>Join Room</button>
        <h1> { this.props.code }</h1>

      </div>
    );
  }
}

export default Menu;
