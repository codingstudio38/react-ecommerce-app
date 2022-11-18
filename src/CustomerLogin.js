import TopHeader from './TopHeaderComponents/TopHeader';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './css/Register.css';
import Footer from './Footer/Footer';
function CustomerLogin() {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Customer - Login";
        if (window.localStorage.getItem("customer")) {
            navigate('../customer/dashboard');
        }
    }, [])
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [btndisable, setDtndisable] = useState(false);

    const apiurl = "http://127.0.0.1:8000/api";
    async function getFormData(e) {
        setDtndisable(true);
        e.preventDefault();
        let result = await fetch(`${apiurl}/customer/login`, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'email': email, 'password': password }),
        });
        result = await result.json();
        if (result.status === 200) {
            window.localStorage.clear();
            window.localStorage.setItem("customer", JSON.stringify(result.user_data));
            setEmail("");
            setPassword("")
            navigate('../customer/dashboard');
        } else {
            alert(result.message);
        }
        setDtndisable(false);
    }
    function Sign() { return (<>Sign in</>) }
    function Loder() { return (<><span className="fas fa-spinner fa-pulse ml-3"></span></>) }


    return (
        <div>
            <TopHeader />
            <section className="background-radial-gradient overflow-hidden">
                <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
                            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                                Hello everyone. <br />
                                <span style={{ color: "hsl(218, 81 %, 75 %)" }}>It's a demo ReactJS login page.</span>
                            </h1>
                            <p className="mb-4 opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Temporibus, expedita iusto veniam atque, magni tempora mollitia
                                dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                                ab ipsum nisi dolorem modi. Quos?
                            </p>
                        </div>

                        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                            <div className="card bg-glass">
                                <div className="card-body px-4 py-5 px-md-5">
                                    <form onSubmit={getFormData} id="myform">
                                        <h3>Login</h3>
                                        <div className="form-outline mb-2">
                                            <input type="email" id="email" name='email' className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <label className="form-label" >Email address</label>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <input type="password" id="password" name='password' className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <label className="form-label" >Password</label>
                                        </div>

                                        <button type="submit" disabled={btndisable} className="btn btn-primary btn-block mb-2 btn-block" style={{ width: "100%" }}>
                                            {btndisable ?
                                                <Loder />
                                                :
                                                <Sign />
                                            }
                                        </button>
                                        <div className="row mb-4">
                                            <div className="col">
                                                <a href="#!">Forgot password?</a>
                                            </div>
                                            <div className="col d-flex justify-content-center">
                                                <div className="text-center">
                                                    <p>Not a member? <Link to="/customer-register">Register</Link></p>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <Footer />
        </div>
    )
}
export default CustomerLogin;