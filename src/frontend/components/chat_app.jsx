import React from "react";
import UserList from "./user_list";

class ChatApp extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    var socket = io();
  }

  render(){
    console.log('ok');
    return (
      <h1></h1>
    );
  }
}
// <UserList/>

export default ChatApp;
