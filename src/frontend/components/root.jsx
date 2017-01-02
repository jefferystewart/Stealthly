import { Provider } from 'react-redux';
import React from 'react';
import ChatApp from './chat_app';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <ChatApp/>
    </Provider>
  )
};


export default Root;
