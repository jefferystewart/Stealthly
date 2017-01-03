import { RECEIVE_USER } from '../actions/session';
import merge from 'lodash/merge';

const defaultState = {
  nickname:null
};

const session = (state = defaultState, action) => {
  switch (action.type){
    case RECEIVE_USER:
      return {nickname:action.user};
    default:
      return state;
  }
};

export default session;
