import './../css/Customer.css';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import UserDashboard from './UserDashboard';
function UserIndex() {
    const navigate = useNavigate();
    const location = useLocation();
    const customerc = location.pathname === "/customer" ? true : false;
    const customerc_ = location.pathname === "/customer/" ? true : false;
    const informationc = location.pathname === "/customer/information" ? "activeli" : "";
    const addressesc = location.pathname === "/customer/address" ? "activeli" : "";
    const way = location.pathname === "/customer/way" ? "activeli" : "";
    const delivered = location.pathname === "/customer/delivered" ? "activeli" : "";
    const cancelled = location.pathname === "/customer/cancelled" ? "activeli" : "";
    const notifications = location.pathname === "/customer/notifications" ? "activeli" : "";
    const wishlist = location.pathname === "/customer/wishlist" ? "activeli" : "";
    // const dashboard = location.pathname === "customer/dashboard" ? "activeli" : "";
    useEffect(() => {
        document.body.style = "background: #f6f3f3;";
        if (customerc) {
            navigate('/customer/dashboard')
        }
        if (customerc_) {
            navigate('/customer/dashboard')
        }
    }, [])
    // const [panel, setPanel] = useState(true);
    function handleLinkClick(li) {
        if (li === "/customer/information") {
            navigate('/customer/information')
        } else if (li === "/customer/address") {
            navigate('/customer/address')
        } else if (li === "/customer/way") {
            navigate('/customer/way')
        } else if (li === "/customer/delivered") {
            navigate('/customer/delivered')
        } else if (li === "/customer/cancelled") {
            navigate('/customer/cancelled')
        } else if (li === "/customer/notifications") {
            navigate('/customer/notifications')
        } else if (li === "/customer/wishlist") {
            navigate('/customer/wishlist')
        } else {
            navigate('/customer/dashboard')
        }
    }
    function handleLogout() {
        if (window.confirm("Are you sure ?")) {
            window.localStorage.clear();
            navigate('../../');
        }
    }
    return (
        <>
            <div >
                <div className="container bootstrap snippets bootdey mt-2 mb-2" style={{ paddingBottom: "10px" }}>
                    <div style={{ background: "white", padding: "5px" }} className='mt-2 mb-2 row'>
                        <div className="profile-nav col-md-3  mt-2">
                            <div className="panel">
                                <div className="user-heading round">
                                    <Link to="#">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                            alt=""
                                        />
                                    </Link>
                                    <h1>Camila Smith</h1>
                                    <p>deydey@theEmail.com</p>
                                </div>
                                <ul className="nav nav-pills nav-stacked">
                                    <li className='statict'><Link to="#"> <i className="fa fa-user"></i> ACCOUNT SETTINGS</Link></li>
                                    <li>
                                        <ul className='inul'>
                                            <li className={informationc} onClick={() => handleLinkClick('/customer/information')}>
                                                <Link to="/customer/information">Personal Information</Link>
                                            </li>
                                            <li className={addressesc} onClick={() => handleLinkClick('/customer/address')}>
                                                <Link to="/customer/address">Manage Addresses</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className='statict'><Link to="#"><i className="fa fa-list" aria-hidden="true"></i> MY ORDERS </Link></li>
                                    <li>
                                        <ul className='inul'>
                                            <li className={way} onClick={() => handleLinkClick('/customer/way')}>
                                                <Link to="/customer/way">On The Way</Link>
                                            </li>
                                            <li className={delivered} onClick={() => handleLinkClick('/customer/delivered')}>
                                                <Link to="/customer/delivered">Delivered</Link>
                                            </li>
                                            <li className={cancelled} onClick={() => handleLinkClick('/customer/cancelled')}>
                                                <Link to="/customer/cancelled">Cancelled</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className='statict'><Link to="#"><i className="fa fa-address-book-o" aria-hidden="true"></i> MY STUFF</Link></li>
                                    <li>
                                        <ul className='inul'>
                                            <li className={notifications} onClick={() => handleLinkClick('/customer/notifications')}>
                                                <Link to="/customer/notifications">All Notifications</Link>
                                            </li>
                                            <li className={wishlist} onClick={() => handleLinkClick('/customer/wishlist')}>
                                                <Link to="/customer/wishlist">My Wishlist</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li onClick={() => handleLogout()} style={{ backgroundColor: "#0188ff", cursor: "pointer" }}><Link to="#" onClick={() => handleLogout()} style={{ color: "white" }}> <i className="fa fa-sign-out" aria-hidden="true"></i> Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="profile-info col-md-9 mt-2">
                            {/* {customerc === true ? <Outlet></Outlet> : <Outlet></Outlet>} */}
                            <Outlet></Outlet>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    );

}
export default UserIndex;
