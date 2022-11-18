import { connect } from 'react-redux'
import Addcategory from '../../Admin/Master/Addcategory';
import { addcategorylist } from '../../Services/Actions/Action';

const mapStateToProps = state => ({
    PRODUCT_DATA: state.REDUX_ADD_CATEGORY
})
const mapDispatchToProps = dispatch => ({
    addcategoryHandler: data => dispatch(addcategorylist(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Addcategory)  