import { connect } from 'react-redux';
import Menu from './menu';
import { generateCode } from '../actions/room';

const mapStateToProps = ({ room }) => ({
  code: room.code
});

const mapDispatchToProps = (dispatch) => ({
  generateCode: (host) => dispatch(generateCode(host))
});


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
