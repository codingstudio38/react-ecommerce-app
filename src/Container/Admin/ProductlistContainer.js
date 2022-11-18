import { connect } from 'react-redux'
import ProductList from './../../Admin/ProductList';
import { productListF } from '../../Services/Actions/Action';

const mapStateToProps = state => ({
    PRODUCT_DATA: state.REDUX_PRODUCT_LIST
})
const mapDispatchToProps = dispatch => ({
    productListHandler: data => dispatch(productListF(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)  