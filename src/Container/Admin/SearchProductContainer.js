import { connect } from 'react-redux'
import SearchProduct from './../../Admin/SearchProduct';
import { searchProductlist } from '../../Services/Actions/Action';

const mapStateToProps = state => ({
    PRODUCT_DATA: state.REDUX_SEARCH_PRODUCT
})
const mapDispatchToProps = dispatch => ({
    searchProductHandler: data => dispatch(searchProductlist(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct)  