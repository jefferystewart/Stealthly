import { connect } from 'react-redux';
import UserList from './user_list';

const mapStateToProps = ({ session }) => ({ users: session.users } );
export default connect(mapStateToProps, null)(UserList);
