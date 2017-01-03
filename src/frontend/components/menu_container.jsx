import { connect } from 'react-redux';
import Menu from './menu';
import { generateCode } from '../actions/room';

const mapStateToProps = ({ room }) => ({
  code: room.code
});

const mapDispatchToProps = (dispatch) => ({
  generateCode: () => dispatch(generateCode())
});


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
