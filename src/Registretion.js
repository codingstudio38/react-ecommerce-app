import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
// import Header from './Header';
import TopHeader from './TopHeaderComponents/TopHeader';
import Footer from './Footer/Footer';
import './css/Register.css';
function Register() {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Customer - Register";
        if (window.localStorage.getItem("customer")) {
            navigate('../customer/dashboard');
        }
    }, [])

    const [photo, setPhoto] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [btndisable, setDtndisable] = useState(false);
    const apiurl = "http://127.0.0.1:8000/api";




    function getFormData(e) {
        e.preventDefault();
        const myform = new FormData();
        myform.append('firstname', firstname);
        myform.append('lastname', lastname);
        myform.append('email', email);
        myform.append('phone', phone);
        myform.append('password', password);
        myform.append('profile_photo', photo);
        setDtndisable(true);
        axios({
            method: "POST",
            url: `${apiurl}/customer/create`,
            data: myform,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(function (response) {
            console.log(response);
            if (response.status === 200) {
                if (response.data.status === 200) {
                    console.clear();
                    alert(response.data.message);
                    setFirstname("");
                    setLastname("");
                    setEmail("");
                    setPassword("");
                    setPhone("");
                    setPhoto("");
                    window.localStorage.clear();
                    window.localStorage.setItem("customer", JSON.stringify(response.data.user_data));
                    navigate('../customer/dashboard');
                } else {
                    console.clear();
                    console.error(`Response status code ${response.data.message}`);
                }
            } else {
                console.clear();
                console.error(`Network status code ${response.status}`);
            }
            setDtndisable(false);
        }).catch(function (response) {
            console.clear();
            console.error(response);
        });
    }
    function SignUp() { return (<>Sign Up</>) }
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
                                <span style={{ color: "hsl(218, 81 %, 75 %)" }}>It's a demo register page.</span>
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
                                    <form onSubmit={getFormData} id="myform" >
                                        <h3 className='mb-3'>Register</h3>
                                        <div className="row">
                                            <div className="col-md-6 mb-2">
                                                <div className="form-outline">
                                                    <input type="text" id="form3Example1" className="form-control" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                                                    <label className="form-label" >First name</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-2">
                                                <div className="form-outline">
                                                    <input type="text" id="form3Example2" className="form-control" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                                                    <label className="form-label" >Last name</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <input type="file" className="form-control" name="myphoto" id="myphoto" onChange={(e) => setPhoto(e.target.files[0])} />
                                            <label className="form-label" >Profile Picture</label>
                                        </div>
                                        <div className="form-outline mb-2">
                                            <input type="email" id="form3Example3" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <label className="form-label" >Email address</label>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <input type="number" id="phone" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                            <label className="form-label" >Phone</label>
                                        </div>


                                        <div className="form-outline mb-2">
                                            <input type="password" id="form3Example4" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                            <label className="form-label" >Password</label>
                                        </div>



                                        <button type="submit" className="btn btn-primary btn-block mb-2 btn-block" style={{ width: "100%" }}>
                                            {btndisable ?
                                                <Loder />
                                                :
                                                <SignUp />
                                            }
                                        </button>
                                        <div className="text-left">
                                            <p>Already have an account ? <Link to="/customer-login">Login</Link></p>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <Footer />
        </div >
    );
}
export default Register;