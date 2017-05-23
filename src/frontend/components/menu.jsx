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
        <p className="alert alert-danger"> Please pick a name. </p>
      );
    }
    if (this.state.codeError) {
      codeError = (
        <p className="alert alert-danger"> Not an active room. </p>
      );
    }
    return (
      <div className="container text-center col-xs-12 col-sm-8 col-sm-offset-2">
        <div className="page-header text-center">
          <h1>STEALHLY</h1>
          <p>Create a room and share the code with your fellow stealthy friends! Or if someone gives you a code, join the room!</p>
        </div>
        <div className="form-group">
          <label htmlFor="roominput">Room Code</label>
          { codeError }
          <input className="form-control input-lg button" id="roominput" onChange={ this.updateCode.bind(this) }></input>
        </div>
        <div className="form-group">
          <label htmlFor="nameinput">Codename</label>
          { nicknameError }
          <input className="form-control input-lg button" id="nameinput" onChange={ this.updateNickname.bind(this) }></input>
        </div>
        <div className="form-group">
          <button className="btn btn-default" onClick={ this.generateCode.bind(this) }>Create Room</button>
          <button className="btn btn-default" onClick={ this.joinChatRoom.bind(this) }>Join Room</button>
        </div>
      </div>
    );
  }
}

export default Menu;
