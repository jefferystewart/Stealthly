import { connect } from 'react-redux';
import { receiveUser } from '../actions/session';
import Room from './room';

const mapStateToProps = ({ room, session }) => ({
  code: room.code, error: room.error, nickname: session.nickname
});

const mapDispatchToProps = (dispatch) => ({
  receiveUser: (nickname) => dispatch(receiveUser(nickname))
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
