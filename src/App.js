import './css/App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Logincontainer from './Container/Logincontainer';


import Protected from './Protected';
import AddProductContainer from './Container/Admin/AddProductContainer';
import ProductlistContainer from './Container/Admin/ProductlistContainer';
import UpdateProductContainer from './Container/Admin/UpdateProductContainer';
import SearchProductContainer from './Container/Admin/SearchProductContainer';
import Adminindex from './Admin/Adminindex';
import AddcategoryContainter from './Container/Admin/AddcategoryContainter';
import AddsubcategoryContainter from './Container/Admin/AddsubcategoryContainter';
import AddbrandContainter from './Container/Admin/AddbrandContainter';

// import Login from './Login';
// import AddProduct from './Admin/AddProduct';
// import ProductList from './Admin/ProductList';
// import UpdateProduct from './Admin/UpdateProduct';
// import SearchProduct from './Admin/SearchProduct';
// import Addbrand from './Admin/Master/Addbrand';
// import Addcategory from './Admin/Master/Addcategory';
// import Addsubcategory from './Admin/Master/Addsubcategory';
import Registretion from './Registretion';
import CustomerLogin from './CustomerLogin';
import CustomerVerify from './CustomerVerify';
import UserIndex from './Users/UserIndex';
import UserDashboard from './Users/UserDashboard';
import Information from './Users/Information';
import Addresses from './Users/Addresses';

import Home from './Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path='' element={<Home />} />
          <Route path='login' element={<Logincontainer />} />
          <Route path='/cpanel' element={<Protected Component={Adminindex} />}>
            <Route path='view' element={<Protected Component={ProductlistContainer} />} />
            <Route path='add' element={<Protected Component={AddProductContainer} />} />
            <Route path='update' element={<Protected Component={UpdateProductContainer} />} />
            <Route path='search' element={<Protected Component={SearchProductContainer} />} />
            <Route path='addcategory' element={<Protected Component={AddcategoryContainter} />} />
            <Route path='addsubcategory' element={<Protected Component={AddsubcategoryContainter} />} />
            <Route path='addbrand' element={<Protected Component={AddbrandContainter} />} />
          </Route>
          <Route path='customer-register' element={<Registretion />} />
          <Route path='customer-login' element={<CustomerLogin />} />
          <Route path='/customer' element={<CustomerVerify Component={UserIndex} />}>
            <Route path='dashboard' element={<CustomerVerify Component={UserDashboard} />} />
            <Route path='information' element={<CustomerVerify Component={Information} />} />
            <Route path='address' element={<CustomerVerify Component={Addresses} />} />
            <Route path='way' element={<CustomerVerify Component={Addresses} />} />
            <Route path='delivered' element={<CustomerVerify Component={Addresses} />} />
            <Route path='cancelled' element={<CustomerVerify Component={Addresses} />} />
            <Route path='notifications' element={<CustomerVerify Component={Addresses} />} />
            <Route path='wishlist' element={<CustomerVerify Component={Addresses} />} />
          </Route>
          <Route path='*' element={<Navigate to="" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
