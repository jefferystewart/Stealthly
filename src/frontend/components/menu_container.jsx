import { connect } from 'react-redux';
import Menu from './menu';
import { generateCode } from '../actions/room';


const mapDispatchToProps = (dispatch) => ({
  generateCode: () => dispatch(generateCode())
});


export default connect(null, mapDispatchToProps)(Menu);
