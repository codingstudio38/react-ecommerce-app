import './../css/Customer.css';
import React, { useEffect } from 'react';

function UserDashboard() {
    useEffect(() => {
        document.title = "Customer - Dashboard";
    }, [])

    return (
        <div >
            <div className="row">
                <div className="col-sm-4">
                    <div className="card bg-warning" style={{ height: "161px" }}>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>

                        </div>
                    </div>
                </div>
                <div className="col-sm-4 ">
                    <div className="card bg-primary" style={{ height: "161px" }}>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>

                        </div>
                    </div>
                </div>
                <div className="col-sm-4 ">
                    <div className="card bg-danger" style={{ height: "161px" }}>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>

                        </div>
                    </div>
                </div>
            </div>
            <h1 style={{ textAlign: "center", lineHeight: 10 }}>CUSTOMER DASHBOARD</h1>
        </div >
    );
}
export default UserDashboard;
