import React from "react";
import UserList from "./user_list";
import MenuContainer from "./menu_container";

class ChatApp extends React.Component {

  constructor(props){
    super(props);
    this.state = {roomCode:"", users:[]};
  }

  componentDidMount(){
  }

  render(){
    return (
      <MenuContainer/>
    );
  }
}
// <UserList/>

export default ChatApp;
