import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Adminheader from './Adminheader';
import React, { useEffect } from 'react';
function Adminindex() {
    const navigate = useNavigate();
    const location = useLocation();
    const L1 = location.pathname === "/cpanel" ? true : false;
    const L2 = location.pathname === "/cpanel/" ? true : false;
    useEffect(() => {
        // navigate('/cpanel/view');
        if (L1) {
            navigate('/cpanel/view')
        }
        if (L2) {
            navigate('/cpanel/view')
        }
    }, [])
    return (
        <>
            <Adminheader />
            <Outlet></Outlet>
        </>
    )
}
export default Adminindex;