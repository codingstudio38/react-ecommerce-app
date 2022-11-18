import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
import '../css/Register.css';
import { ADMIN_DETAILS, LOGOUT_URL } from '../Services/Constant';
function Adminheader() {
    const navigate = useNavigate();
    const ADMIN = ADMIN_DETAILS();
    useEffect(() => {
        setInterval(function () {
            if (ADMIN_DETAILS() === false) {
                window.localStorage.clear();
                //window.location.href = LOGOUT_URL;
                navigate('/login');
            }
        }, 1000);
    }, []);
    function checkUser() {
        let user = window.localStorage.getItem("user_info");
        if (user) {
            return user;
        } else {
            return false;
        }
    }
    function logout() {
        if (window.confirm("Are you sure ?")) {
            window.localStorage.clear();
            // navigate('../login');
            // window.location.href = LOGOUT_URL;
            navigate('/login');
        }
    }
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Nav className="me-auto">
                    {
                        checkUser() ?
                            <>
                                <Nav>
                                    <NavDropdown title={"Master Page"}>
                                        <NavLink className={"dropdown-item navlink"} to="addcategory">Manage Category</NavLink>
                                        <NavLink className={"dropdown-item navlink"} to="addsubcategory">Manage Sub-Category</NavLink>
                                        <NavLink className={"dropdown-item navlink"} to="addbrand">Manage Brand</NavLink>
                                    </NavDropdown>
                                </Nav>
                                <Nav>
                                    <NavDropdown title={"Manage Product"}>
                                        <NavLink className={"dropdown-item navlink"} to="view">Product List</NavLink>
                                        <NavLink className={"dropdown-item navlink"} to="add">Add Product</NavLink>
                                        <NavLink className={"dropdown-item navlink"} to="search">Search Produc</NavLink>
                                    </NavDropdown>
                                </Nav>
                            </>
                            :
                            <>
                                <NavLink className={"navlink"} to="/">Home</NavLink>
                                <NavLink className={"navlink"} to="/login">Login</NavLink>
                                <NavLink className={"navlink"} to="/register">Register</NavLink>
                            </>
                    }

                </Nav>
                {
                    checkUser() ?
                        <Nav>
                            <NavDropdown title={ADMIN.name}>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        : null
                }
            </Container>
        </Navbar>
    );
}

export default Adminheader;