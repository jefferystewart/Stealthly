import React from "react";

class Room extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.code.length > 0){
      var socket = io(`/${nextProps.code}`);
    }
  }
  render(){

    if (this.props.error){
      return(
        <div className="room">
          <h3>{ this.props.error }</h3>
        </div>
      );
    }else {
      return (
        <div className="room">
          <h3> Room Code: { this.props.code } </h3>
        </div>
      );
    }
  }
}

export default Room;
