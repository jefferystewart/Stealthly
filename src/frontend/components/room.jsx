import React from "react";

class Room extends React.Component {

  constructor(props){
    super(props);
    this.state = {socket: null, message:"", log:[] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if (this.props.code && this.props.code.length > 0){
      const socket = io(`/${this.props.code}`);
      socket.on('chat message', (msg, nickname) => {
        console.log(msg);
        const newLog = this.state.log;
        newLog.push({user: nickname, msg: msg});
        socket.emit('log chat message', newLog);
        this.setState({log:newLog});
      });
      this.setState({ socket: socket });
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.code && nextProps.code.length > 0){
      const socket = io(`/${nextProps.code}`);
      socket.on('chat message', (msg, nickname) => {
        console.log(msg);
        const newLog = this.state.log;
        newLog.push({user: nickname, msg: msg});
        socket.emit('log chat message', newLog);
        this.setState({log:newLog});
      });
      this.setState({ socket: socket });
    }
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
        <div className="room">
          <h1> Room Code: { this.props.code }</h1>
          <form onSubmit={ this.handleSubmit }>
            <input type="text" value={this.state.message} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
          <ul id="messages">
            { this.state.log.map(function(msg, idx){
                return <li key={ idx }>{ msg.user } : { msg.msg }</li>;
              }) }
          </ul>
        </div>
      );
    }
  }
}

export default Room;
