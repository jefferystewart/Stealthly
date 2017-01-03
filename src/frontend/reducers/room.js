import { RECEIVE_CODE, RECEIVE_ROOM_ERROR } from '../actions/room';
import merge from 'lodash/merge';

const defaultState = {
  code:null, error:null
};

const room = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_CODE:
      return merge({}, state, {code: action.code});
    case RECEIVE_ROOM_ERROR:
      return merge({}, state, {error: action.error.responseText});
    default:
      return state;
  }
};

export default room;
