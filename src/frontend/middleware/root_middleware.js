import { applyMiddleware } from 'redux';
import RoomMiddleware from './room_middleware';

const RootMiddleware = applyMiddleware(RoomMiddleware);

export default RootMiddleware;
