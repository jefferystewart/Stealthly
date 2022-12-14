import React from "react";
import $ from "jquery";
import GifContainer from "./gif_container";
import aesjs from "aes-js"

const KEY = [136, 234, 39, 101, 114, 68, 62, 128, 174, 194, 201, 183, 193, 76,  76, 99];

class Room extends React.Component {

  constructor(props){
    super(props);
    this.state = {socket: null, message:"", log:[], nickname:null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _unloadFunction(e){
    e.preventDefault();
    this.state.socket.emit("user-disconnected", this.props.nickname);
    return e.returnValue;
  }

  componentDidMount(){
    if (this.props.code && this.props.code.length > 0){
      const socket = io(`/${this.props.code}`);
      if (!this.state.socket){
        this._setupSocket(socket);
      }
    }
    window.addEventListener("beforeunload", this._unloadFunction.bind(this));
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.code && nextProps.code.length > 0){
      const socket = io(`/${nextProps.code}`);
      if (!this.state.socket){
        this._setupSocket(socket);
      }
    }
  }

  componentWillUnmount(){
    window.removeEventListener("beforeunload", this._unloadFunction.bind(this));
  }

  _scrollToBottom(){
    $('.messages').animate({scrollTop: $('.messages').prop("scrollHeight")}, 50);
  }

  _setupSocket(socket) {

    if (this.props.nickname){
      socket.emit('user-connect', this.props.nickname);
    }
    socket.on('chat message', (msg, nickname) => {

      var encryptedBytes = aesjs.utils.hex.toBytes(msg);
      var aesCtr = new aesjs.ModeOfOperation.ctr(KEY, new aesjs.Counter(5));
      var decryptedBytes = aesCtr.decrypt(encryptedBytes);

      var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

      const newLog = this.state.log;
      newLog.push(<li className="list-group-item chat-item" key={ this.state.log.length }><strong>{ nickname }</strong> : { decryptedText }</li>);
      socket.emit('log chat message', newLog);
      this._scrollToBottom();
      this.setState({log:newLog});
    });

    socket.on('chat gif', (gif, nickname) => {
      const newLog = this.state.log;
      newLog.push(<li className="list-group-item chat-item" key={ this.state.log.length }><strong>{ nickname }</strong> : <img src={ gif }></img></li>);
      this._scrollToBottom();
      this.setState({log:newLog});
    });
    socket.on('user-connect', (nickname) => {
      const newLog = this.state.log;
      newLog.push(<li className="list-group-item chat-item italics" key={ this.state.log.length }>{ nickname } has entered the room!</li>);
      this._scrollToBottom();
      this.setState({log:newLog});
    });
    socket.on('user-disconnected', (nickname) => {
      const newLog = this.state.log;
      newLog.push(<li className="list-group-item chat-item italics" key={ this.state.log.length }>{ nickname } has left the room!</li>);
      this._scrollToBottom();
      this.setState({log:newLog});
    });
    this.setState({ socket: socket });
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    var textBytes = aesjs.utils.utf8.toBytes(this.state.message);
    var aesCtr = new aesjs.ModeOfOperation.ctr(KEY, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

    this.state.socket.emit('chat message', encryptedHex, this.props.nickname);
    this.setState({ message:'' });
    return false;
  }

  addGif(gif){
    this.setState({ message:'' });
    this.state.socket.emit('chat gif', gif, this.props.nickname);
  }

  updateNickname(e){
    this.setState({ nickname:e.currentTarget.value });
  }

  submitNickname(e){
    e.preventDefault();
    this.props.receiveUser(this.state.nickname);
    this.state.socket.emit('user-connect', this.state.nickname);
  }

  render(){
    window.state = this.state;
    if (this.props.error){
      return(
        <div className="room-header text-center">
          <h1>{ this.props.error }</h1>
          <p> Check to make sure the code is correct!! </p>
        </div>
      );
    }else {
      let gifContainer, gifButton, textContainer, nicknameContainer;

      if (this.props.nickname){

        if(this.state.message.toLowerCase() === "gif"){
          gifContainer = <GifContainer addGif={this.addGif.bind(this)}/>;
        }
        if (true){
          textContainer =
          <form className="form-group" onSubmit={ this.handleSubmit }>
            <div className="input-group">
              <input className= "form-control" type="text" value={this.state.message} onChange={this.handleChange} />
              <span className="input-group-btn">
                <button type="submit" value="Submit" className="btn btn-default">Send</button>
              </span>
            </div>
          </form>;
        }
      } else{
        nicknameContainer =
          <form className="form-group" onSubmit={ this.submitNickname.bind(this) }>
            <label htmlFor="nameinput">Choose your secret codename!</label>
            <div className="input-group">
              <input className= "form-control" type="text" id="nameinput" onChange={ this.updateNickname.bind(this) } />
              <span className="input-group-btn">
                <button type="submit" value="Submit" className="btn btn-default">Go</button>
              </span>
            </div>
          </form>;
      }
      return (
        <div>
          <div className="room-header text-center">
            <h1>Room: { this.props.code }</h1>
            <p>Share <strong>stealthly.herokuapp.com/{this.props.code}</strong> with your fellow spys and talk in secret! </p>
          </div>
          <div>
            <div className="col-xs-12 text-center chat">
              { nicknameContainer }
              <ul id="messages" className="list-group text-left messages">
                { this.state.log }
              </ul>
              <div className="chat-box">
                { gifContainer }
                { textContainer }
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Room;
