import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
function CustomerVerify(props) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!window.localStorage.getItem("customer")) {
            navigate('/customer-login');
        }
    }, [])
    let Cmp = props.Component
    return (
        <>
            <Cmp></Cmp>
        </>
    )
}
export default CustomerVerify;