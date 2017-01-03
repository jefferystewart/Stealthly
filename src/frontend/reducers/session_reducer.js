import { RECEIVE_USER } from '../actions/session';
import merge from 'lodash/merge';

const defaultState = {
  user:null
};

const session = (state = defaultState, action) => {
  switch (action.type){
    case RECEIVE_USER:
      return {user:action.user};
    default:
      return state;
  }
};

export default session;
