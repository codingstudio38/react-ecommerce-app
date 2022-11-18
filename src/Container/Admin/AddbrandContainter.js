import { connect } from 'react-redux'
import Addbrand from './../../Admin/Master/Addbrand';
import { addbrandlist } from '../../Services/Actions/Action';

const mapStateToProps = state => ({
    PRODUCT_DATA: state.REDUX_ADD_BRAND
})
const mapDispatchToProps = dispatch => ({
    addbrandHandler: data => dispatch(addbrandlist(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Addbrand)  