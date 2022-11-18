import './../css/Customer.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
function Information() {
    const location = useLocation();
    useEffect(() => {
        document.title = "Customer - Manage Personal Information";
    }, [])

    return (
        <>
            <div className="panel " style={{ background: "aliceblue" }}>
                <div className="bio-graph-heading">
                    <Link style={{ borderRadius: "0px", color: "black" }} to="/customer/dashboard"><i className="fa fa-tachometer" aria-hidden="true"></i></Link> {">"} MANAGE PERSONAL INFORMATION
                </div>
                <div style={{ padding: "5px" }}>
                    <div className="panel-body bio-graph-info mt-3">
                        <h1 className='panel-h1'> Personal Information <i className="fa fa-pencil-square-o" aria-hidden="true"></i></h1>
                        <div className="row">
                            <div className="col-md-4">
                                <input type="text" className="form-control custom" placeholder="First name" />
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control custom" placeholder="Last name" />
                            </div>
                            <div className="col-md-4">
                                <input type="button" className="btn btn-primary custom " defaultValue="Save" />
                            </div>

                        </div>
                        <div className="row mt-4">
                            <div className="col-md-12">
                                <label className="mb-3 label-set">Your Gender</label><br />
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" defaultValue="M" id='inlineRadio1' />
                                    <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" defaultValue="F" id='inlineRadio2' />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel-body bio-graph-info mt-4">
                        <h1 className='panel-h1'> Email Address <i className="fa fa-pencil-square-o" aria-hidden="true"></i></h1>
                        <div className="row">
                            <div className="col-md-4">
                                <input type="email" className="form-control custom" placeholder="Email Address" />
                            </div>
                            <div className="col-md-1">
                                <input type="button" className="btn btn-primary custom " defaultValue="Save" />
                            </div>
                            <div className="col-md-4">
                                <input type="number" className="form-control custom" placeholder="OTP" />
                                <label className='text-primary'>60</label>
                                <label className='text-primary' style={{
                                    textDecoration: "underline", marginLeft: "5px", fontWeight: "500", cursor: "pointer"
                                }}>Resend</label>
                                <label className='text-danger' style={{ textDecoration: "underline", marginLeft: "5px", fontWeight: "500", cursor: "pointer" }}>Cancel</label>
                            </div>
                            <div className="col-md-2">
                                <input type="button" className="btn btn-primary custom " defaultValue="Verify" />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-4">
                                <input type="button" className="btn btn-primary custom " style={{ "width": "100%" }} defaultValue="Change Password" />
                            </div>
                        </div>
                    </div>

                    <div className="panel-body bio-graph-info mt-5 mb-5">
                        <h1 className='panel-h1'> Mobile Number <i className="fa fa-pencil-square-o" aria-hidden="true"></i></h1>
                        <div className="row">
                            <div className="col-md-4">
                                <input type="number" className="form-control custom" placeholder="Mobile Number" />
                            </div>
                            <div className="col-md-1">
                                <input type="button" className="btn btn-primary custom " defaultValue="Save" />
                            </div>
                            <div className="col-md-4">
                                <input type="number" className="form-control custom" placeholder="OTP" />
                                <label className='text-primary'>60</label>
                                <label className='text-primary' style={{
                                    textDecoration: "underline", marginLeft: "5px", fontWeight: "500", cursor: "pointer"
                                }}>Resend</label>
                                <label className='text-danger' style={{ textDecoration: "underline", marginLeft: "5px", fontWeight: "500", cursor: "pointer" }}>Cancel</label>
                            </div>
                            <div className="col-md-2">
                                <input type="button" className="btn btn-primary custom " defaultValue="Verify" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Information;