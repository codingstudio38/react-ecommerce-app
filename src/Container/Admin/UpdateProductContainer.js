import { connect } from 'react-redux'
import UpdateProduct from '../../Admin/UpdateProduct';
import { getProductDetail } from '../../Services/Actions/Action';

const mapStateToProps = state => ({
    PRODUCT_UPDATE_DATA: state.REDUX_PRODUCT_UPDATE
})
const mapDispatchToProps = dispatch => ({
    productDetailtHandler: data => dispatch(getProductDetail(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)  