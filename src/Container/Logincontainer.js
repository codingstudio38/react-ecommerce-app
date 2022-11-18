import { connect } from 'react-redux'
import Login from './../Login';
import { adminLogin } from '../Services/Actions/Action';

const mapStateToProps = state => ({
    LOGIN_DATA: state.REDUX_LOGIN_HANDLER
})
const mapDispatchToProps = dispatch => ({
    adminLoginHandler: data => dispatch(adminLogin(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)  