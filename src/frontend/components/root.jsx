import { Provider } from 'react-redux';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import MenuContainer from './menu_container';
import { getRoom } from '../actions/room';
import RoomContainer from './room_container';

const Root = ({ store }) => {

  const _updateRoomCode = (nextState, replace) => {
    store.dispatch(getRoom(nextState.params.room_code));
  };

  return (
    <Provider store={store}>
      <Router history= { hashHistory }>
        <Route path="/">
          <IndexRoute component={ MenuContainer }/>
          <Route path="/:room_code" component={ RoomContainer } onEnter= {_updateRoomCode}/>
        </Route>
      </Router>
    </Provider>
  )
};


export default Root;
