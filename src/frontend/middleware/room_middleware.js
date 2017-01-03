import { GENERATE_CODE, receiveCode } from '../actions/room';
import { generateCode } from '../util/room_api';

const roomMiddleware = ({ getState, dispatch}) => next => action => {
  // const success = code => dispatch(receiveCode(code));
  const success = code => {
    debugger
    dispatch(receiveCode(code));
  };
  const error = err => {
    debugger
    console.log(err);
  }

  switch (action.type) {
    case GENERATE_CODE:
      generateCode(success, error);
      return next(action);
    default:
      return next(action);
  }
};

export default roomMiddleware;
