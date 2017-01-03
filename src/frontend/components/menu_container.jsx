import { connect } from 'react-redux';
import Menu from './menu';
import { generateCode } from '../actions/room';
import { receiveUser } from '../actions/session';

const mapStateToProps = ({ room }) => ({
  code: room.code
});

const mapDispatchToProps = (dispatch) => ({
  generateCode: (host, callback) => dispatch(generateCode(host, callback)),
  receiveUser: (nickname) => dispatch(receiveUser(nickname))
});


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
