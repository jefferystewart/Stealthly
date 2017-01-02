import { applyMiddleware } from 'redux';
import SignatureMiddleware from './signature_middleware';

const RootMiddleware = applyMiddleware(SignatureMiddleware);

export default RootMiddleware;
