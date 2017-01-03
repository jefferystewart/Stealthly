import React from "react";

class Room extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){

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
