import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/AddProduct.css';
import { API_URL, ADMIN_DETAILS, LOGOUT_URL } from '../Services/Constant';
function SearchProduct(props) {
    const ADMIN = ADMIN_DETAILS();
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const apiurl = API_URL;
    useEffect(() => {
        document.title = "Admin - Search Product";
        if (ADMIN_DETAILS() === false) {
            window.localStorage.clear();
            // window.location.href = LOGOUT_URL;
            navigate('/login');
        }
    }, [])
    async function search(key) {
        if (key.length == 0) {
            setData([]); return;
        }

        let result = await fetch(`${apiurl}/access/searchproduct?keywork=${key}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN.bearer_token}`,
            }
        });
        //props.searchProductHandler({ keyword: key })
        result = await result.json();
        if (result.status === 200) {
            setData(result.data);
        } else {
            alert(result.message);
        }

    }
    return (
        <Fragment>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Search Product</div>
                            <div className="card-body">
                                <div className="input-group">
                                    <input className="form-control py-2 border-left-0 border" type="search" id="example-search-input" placeholder='search here..' onKeyUp={(e) => search(e.target.value)} />
                                </div>
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                        <th>Photo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) =>
                                            <tr key={index} id={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                                <td>
                                                    <textarea defaultValue={item.description} ></textarea>
                                                </td>
                                                <td>
                                                    <img src={"http://127.0.0.1:8000/products/" + item.product_img} alt="" style={{ width: "40px", height: "50px" }} />
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default SearchProduct;