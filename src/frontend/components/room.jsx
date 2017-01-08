import React from "react";
import $ from "jquery";
import GifContainer from "./gif_container";

class Room extends React.Component {

  constructor(props){
    super(props);
    this.state = {socket: null, message:"", log:[] };
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
      this._setupSocket(socket);
    }
    window.addEventListener("beforeunload", this._unloadFunction.bind(this));
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.code && nextProps.code.length > 0){
      const socket = io(`/${nextProps.code}`);
      this._setupSocket(socket);
    }
  }

  componentWillUnmount(){
    window.removeEventListener("beforeunload", this._unloadFunction.bind(this));
  }

  _setupSocket(socket) {
    socket.emit('user-connect', this.props.nickname);
    socket.on('chat message', (msg, nickname) => {
      const newLog = this.state.log;
      newLog.push(<li className="list-group-item chat-item" key={ this.state.log.length }><strong>{ nickname }</strong> : { msg }</li>);
      socket.emit('log chat message', newLog);
      this.setState({log:newLog});
    });
    socket.on('user-connect', (nickname) => {
      const newLog = this.state.log;
      newLog.push(<li className="list-group-item chat-item italics" key={ this.state.log.length }>{ nickname } has entered the room!</li>);
      this.setState({log:newLog});
    });
    socket.on('user-disconnected', (nickname) => {
      const newLog = this.state.log;
      newLog.push(<li className="list-group-item chat-item italics" key={ this.state.log.length }>{ nickname } has left the room!</li>);
      this.setState({log:newLog});
    });
    this.setState({ socket: socket });
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.socket.emit('chat message', this.state.message, this.props.nickname);
    this.setState({ message:'' });
    return false;
  }

  addGif(gif){
    const newLog = this.state.log;
    newLog.push(
      <li className="list-group-item chat-item" key={ this.state.log.length }>
        { gif }
      </li>);

    this.setState({log:newLog});
  }

  render(){
    window.state = this.state;
    if (this.props.error){
      return(
        <div className="room">
          <h3>{ this.props.error }</h3>
        </div>
      );
    }else {
      return (
        <div>
          <div className="page-header text-center">
            <h1> Room: { this.props.code }</h1>
            <p> Share your code with your friends and have a ball! </p>
          </div>
          <div>
            <div className="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-0 text-center">
              <GifContainer addGif={this.addGif.bind(this)}/>
            </div>

            <form className="col-xs-12 col-xs-offset-0 col-sm-4 col-sm-offset-0 text-center chat" onSubmit={ this.handleSubmit }>
              <ul id="messages" className="list-group text-left messages">
                { this.state.log }
              </ul>
              <div className="form-group chat-box">
                <div className="input-group">
                  <input className= "form-control" type="text" value={this.state.message} onChange={this.handleChange} />
                  <span className="input-group-btn">
                    <button type="submit" value="Submit" className="btn btn-default">Send</button>
                  </span>
                </div>
              </div>
            </form>



          </div>

        </div>
      );
    }
  }
}

export default Room;
