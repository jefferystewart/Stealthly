import { connect } from 'react-redux';
import Room from './room';

const mapStateToProps = ({ room, session }) => ({
  code: room.code, error: room.error, nickname: session.nickname
});

export default connect(mapStateToProps)(Room);
