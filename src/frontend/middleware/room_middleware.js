import { GET_ROOM, GENERATE_CODE, receiveCode, receiveRoomError } from '../actions/room';
import { generateCode, getRoom } from '../util/room_api';

const roomMiddleware = ({ getState, dispatch}) => next => action => {
  // const success = code => dispatch(receiveCode(code));
  const success = code => {
    dispatch(receiveCode(code));
  };
  const error = err => {
    dispatch(receiveRoomError(err));
  };

  switch (action.type) {
    case GENERATE_CODE:
      generateCode(action.host, success, error);
      return next(action);
    case GET_ROOM:
      getRoom(action.code, success, error);
      return next(action);
    default:
      return next(action);
  }
};

export default roomMiddleware;
