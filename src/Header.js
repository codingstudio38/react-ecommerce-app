import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate, NavLink, Link } from 'react-router-dom';
//import React, { useState, useEffect } from 'react';
import './css/Register.css';
function Header() {
    const navigate = useNavigate();
    const loggedinuser = JSON.parse(window.localStorage.getItem("user_info"));
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
            navigate('/login');
        }
    }
    //console.log(loggedinuser);
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Nav className="me-auto">
                    {
                        checkUser() ?
                            <>
                                <NavLink className={"navlink"} to="view">Product List</NavLink>
                                <NavLink className={"navlink"} to="add">Add Product</NavLink>
                                <NavLink className={"navlink"} to="search">Search Product</NavLink>
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
                            <NavDropdown title={loggedinuser.name}>
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

export default Header;