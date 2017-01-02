import { POST_SIGNATURE, RECEIVE_RESPONSE, receiveResponse} from '../actions/signature';
import { postSignature } from '../util/signature_api';

const signatureMiddleware = ({ getState, dispatch}) => next => action => {
  const success = response => dispatch(receiveResponse(response));
  const error = response => dispatch(receiveResponse(response));

  switch (action.type){
    case POST_SIGNATURE:
      postSignature(action.key, action.hash, success, error);
      return next(action);
    default:
      return next(action);
  }
};

export default signatureMiddleware;
