import { combineReducers } from 'redux';
import session from './session_reducer';
import room from './room';


const RootReducer = combineReducers({session, room});

export default RootReducer;
