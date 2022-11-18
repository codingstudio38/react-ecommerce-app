import { connect } from 'react-redux'
import Addsubcategory from '../../Admin/Master/Addsubcategory';
import { addsubcategorylist } from '../../Services/Actions/Action';

const mapStateToProps = state => ({
    PRODUCT_DATA: state.REDUX_ADD_SUB_CATEGORY
})
const mapDispatchToProps = dispatch => ({
    addsubcategoryHandler: data => dispatch(addsubcategorylist(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Addsubcategory)  