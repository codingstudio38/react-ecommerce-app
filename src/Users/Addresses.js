import './../css/Customer.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { API_URL, LOGOUT_URL } from '../Services/Constant';
function Addresses() {
    const location = useLocation();
    const [addresslist, setAddresslist] = useState([]);
    useEffect(() => {
        document.title = "Customer - Manage Address";
        getaddresslist();
    }, [])
    async function getaddresslist() {
        let result = await fetch(`${API_URL}/customer-profile/address-type`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer 1234567890`,
            }
        });
        result = await result.json();
        if (result.status === 200) {
            setAddresslist(result.list);
            // console.log(addresslist);
            // console.log(result.list);
        } else {
            alert(result.message);
        }
    }
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    function showPosition(position) {
        alert(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`)
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
            default:
                return true;
        }
    }
    return (
        <>
            <div className="panel" style={{ background: "aliceblue" }}>
                <div className="bio-graph-heading">
                    <Link style={{ borderRadius: "0px", color: "black" }} to="/customer/dashboard"><i className="fa fa-tachometer" aria-hidden="true"></i></Link> {">"} MANAGE ADDRESS
                </div>
                <div style={{ padding: "5px" }}>
                    <div className="panel-body bio-graph-info mt-3">
                        <h6 className='panel-h1'>ADD A NEW ADDRESS</h6>

                        <div className="row">
                            <div className="col-md-4">
                                <button onClick={() => getLocation()} type="button" style={{ "width": "100%" }} className="btn btn-primary custom "><i className="fa fa-map-marker" aria-hidden="true"></i> Use my current location</button>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <input type="text" className="form-control custom" placeholder="First name" />
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control custom" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <input type="text" className="form-control custom" placeholder="First name" />
                            </div>
                            <div className="col-md-4">
                                <select name='address_type' id='address_type' className='form-control custom'>
                                    <option defaultValue={""}>Address Type</option>
                                    {
                                        addresslist.map((item, index) =>
                                            <option value={item.id} key={index}>{item.name}</option>
                                        )
                                    }

                                </select>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </>
    )
}
export default Addresses;