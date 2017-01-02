import { connect } from 'react-redux';
import { postSignature } from '../actions/signature';
import Form from './form';

const mapStateToProps = ({ signature }) => ({ status: signature.response } );

const mapDispatchToProps = dispatch => ({
  postSignature: (key, hash) => dispatch(postSignature(key, hash))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
