import { connect } from 'react-redux';
import Room from './room';

const mapStateToProps = ({ room }) => ({
  code: room.code, error: room.error
});

export default connect(mapStateToProps)(Room);
