import { RECEIVE_CODE } from '../actions/room';
import merge from 'lodash/merge';

const defaultState = {
  code:""
};

const room = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_CODE:
      console.log(action.code);
      return { code:action.code };
    default:
      return state;
  }
};

export default room;
