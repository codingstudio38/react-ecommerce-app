import { connect } from 'react-redux'
import AddProduct from './../../Admin/AddProduct';
import { addProduct } from '../../Services/Actions/Action';

const mapStateToProps = state => ({
    PRODUCT_DATA: state.REDUX_ADD_PRODUCT
})
const mapDispatchToProps = dispatch => ({
    addProductHandler: data => dispatch(addProduct(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)  