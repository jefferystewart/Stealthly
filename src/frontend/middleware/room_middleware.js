import { GET_ROOM, GENERATE_CODE, GET_GIFS, receiveGifs, receiveCode, receiveRoomError} from '../actions/room';
import { receiveUser, RECEIVE_USER } from '../actions/session';
import { generateCode, getRoom, getGifs } from '../util/room_api';

const roomMiddleware = ({ getState, dispatch}) => next => action => {
  // const success = code => dispatch(receiveCode(code));
  const success = code => {
    dispatch(receiveCode(code));
    if (action.callback){
      action.callback(code);
    }
  };
  const error = err => {
    dispatch(receiveRoomError(err));
  };

  const gifSuccess = gifs => {
    dispatch(receiveGifs(gifs));
    action.callback();
  };
  switch (action.type) {
    case GENERATE_CODE:
      generateCode(action.host, success, error);
      return next(action);
    case GET_ROOM:
      getRoom(action.code, success, error);
      return next(action);
    case GET_GIFS:
      getGifs(action.query, gifSuccess, error);
      return next(action);
    default:
      return next(action);
  }
};

export default roomMiddleware;
