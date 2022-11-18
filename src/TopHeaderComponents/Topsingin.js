import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
function Topsingin() {
    //console.log(props.user);
    const [user, setUser] = useState(false);
    useEffect(() => {
        checkUser()
    }, [user]);
    const loggedinuser = JSON.parse(window.localStorage.getItem("customer"));
    function checkUser() {
        let user = window.localStorage.getItem("customer");
        if (user) {
            setUser(user);
        } else {
            setUser(false);
        }
    }
    function addstyle() {
        let htmlid = document.getElementById("dropdowndiv");
        if (htmlid.style.display === "none") {
            htmlid.style.display = "block";
        } else {
            htmlid.style.display = "none";
        }
    }
    function logout() {
        if (window.confirm("Are you sure ?")) {
            window.localStorage.clear();
            window.location.href = "http://localhost:3000/"
        }
    }
    return (
        <>
            <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                <div className="float-end">
                    {
                        user === false ?
                            <>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <Link to="" className="btn btn-light">
                                            <i className="fa fa-heart"></i>
                                        </Link>
                                    </div>
                                    <div className='col-md-4'>
                                        <a data-bs-toggle="offcanvas" href="#offcanvas_cart" className="btn btn-light">
                                            <i className="fa fa-shopping-cart"></i>
                                        </a>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="dropdown">
                                            <button className="btn btn-primary dropdown-toggle" type="button" onClick={() => addstyle()}>
                                                Menu
                                            </button>
                                            <div className="dropdown-menu" id="dropdowndiv" style={{ display: "none" }}>
                                                <Link className="dropdown-item" to="/"><i className="fa fa-home" aria-hidden="true"></i>  <span className="ms-1 d-none d-sm-inline-block">Home</span></Link>
                                                <Link className="dropdown-item" to="/customer-login"><i className="fa fa-sign-in" aria-hidden="true"></i>  <span className="ms-1 d-none d-sm-inline-block">Login</span></Link>
                                                <Link className="dropdown-item" to="/customer-register"><i className="fa fa-plus-circle" aria-hidden="true"></i>  <span className="ms-1 d-none d-sm-inline-block">Register</span></Link>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="dropdown">
                                    <button className="btn btn-primary dropdown-toggle" type="button" onClick={() => addstyle()}>
                                        <i className="fa fa-user"></i> {loggedinuser.name}
                                    </button>
                                    <div className="dropdown-menu" id="dropdowndiv" style={{ display: "none" }}>
                                        <Link className="dropdown-item" to="/customer/dashboard"><i className="fa fa-list" aria-hidden="true"></i> <span className="ms-1 d-none d-sm-inline-block">Dashboard</span></Link>
                                        <Link to='' className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => logout()}><i className="fa fa-sign-out" aria-hidden="true"></i>  <span className="ms-1 d-none d-sm-inline-block">Login Out</span></Link>

                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    )
}
export default Topsingin;