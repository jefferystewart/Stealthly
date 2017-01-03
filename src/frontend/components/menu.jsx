import React from "react";

class Menu extends React.Component {

  generateCode(){
    this.props.generateCode();
  }

  render(){
    return (
      <div className="menu">
        <h3> Menu </h3>
        <button onClick={ this.generateCode.bind(this)}>Generate Code</button>
        <p>or Enter code:</p>
        <input></input>
      </div>
    );
  }
}

export default Menu;
