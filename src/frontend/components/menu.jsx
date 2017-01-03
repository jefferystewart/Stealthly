import React from "react";

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = { nickname: "", nicknameError:false };
  }

  updateNickname(e) {
    this.setState({ nickname:e.currentTarget.value });
  }

  generateCode() {
    if (this.state.nickname.length > 0) {
      this.props.generateCode(this.state.nickname);
      this.setState({ nicknameError:false });
    } else {
      this.setState({ nicknameError:true });
    }
  }

  render() {
    let nicknameError;

    if (this.state.nicknameError){
      nicknameError = (
        <p> PLEASE PICK A NICKNAME! </p>
      );
    }
    return (
      <div className="menu">
        <h3> Menu </h3>
        <h1>Nickname</h1>
        { nicknameError }
        <input onChange={ this.updateNickname.bind(this) }></input>
        <button onClick={ this.generateCode.bind(this)}>Generate Code</button>
        <h1> { this.props.code }</h1>
        <p>or Enter code:</p>
        <input></input>
      </div>
    );
  }
}

export default Menu;
