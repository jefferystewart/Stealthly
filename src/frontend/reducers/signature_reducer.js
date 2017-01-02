import { RECEIVE_RESPONSE } from '../actions/signature';
import merge from 'lodash/merge';

const defaultState = {
  response:""
};

const session = (state = defaultState, action) => {
  switch (action.type){
    case RECEIVE_RESPONSE:
      return {response:action.response.status};
    default:
      return state;
  }
};

export default session;
