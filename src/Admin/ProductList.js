import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import './../css/App.css';
import { Pagination } from 'antd';
import { API_URL, ADMIN_DETAILS, LOGOUT_URL } from '../Services/Constant';
function ProductList(props) {
    const apiurl = API_URL;
    const ADMIN = ADMIN_DETAILS();
    const navigate = useNavigate();
    const [currentpage, setCurrentpage] = useState(1);
    const [postsperpage, setPostsperpage] = useState(10);
    const [newdata, setNewdata] = useState([]);
    const [alltotal, setAlltotal] = useState(0);
    const [fromto, setFromto] = useState({ from: 0, to: 0 });
    const [limitval, setLimitval] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        if (ADMIN_DETAILS() === false) {
            window.localStorage.clear();
            // window.location.href = LOGOUT_URL;
            navigate('/login');
        }
        getdata(1, 5);
        // props.productListHandler({ page: 1, size: 5 });
        document.title = "Admin - Product List";
    }, []);
    async function getdata(page, size) {
        setLoad(true);
        let result = await fetch(`${apiurl}/access/productlist?page=${page}&limit=${size}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN.bearer_token}`,
            }
        });
        result = await result.json()
        if (result.status === 200) {
            setPostsperpage(result.data.per_page);
            setCurrentpage(result.data.current_page);
            setNewdata(result.data.data);
            setAlltotal(result.data.total);
            setFromto({ from: result.data.from, to: result.data.to });
            if (result.data.total <= 5) {
                setLimitval([5]);
            } else if (result.data.total <= 10) {
                setLimitval([5, 10]);
            } else if (result.data.total <= 25) {
                setLimitval([5, 10, 25]);
            } else if (result.data.total <= 50) {
                setLimitval([5, 10, 25, 50]);
            } else if (result.data.total <= 100) {
                setLimitval([5, 10, 25, 50, 100]);
            } else {
                setLimitval([5, 10, 25, 50, 100]);
            }
            setLoad(false);
        } else {
            alert(result.message);
        }
    }
    async function deleteis(data) {
        if (window.confirm("Are you sure ?")) {
            let result = await fetch(`${apiurl}/access/deleteproduct/${data.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ADMIN.bearer_token}`,
                }
            });
            result = await result.json()
            if (result.status === 200) {
                alert(result.message);
                getdata(1, 5);
            } else {
                alert(result.message);
            }
        } else {
            return false;
        }
    }
    function changePage(val) {
        getdata(val, postsperpage);
    }
    function changeperPage(e) {
        if (e.target.value === "Limit") {
            setPostsperpage(5);
            setCurrentpage(1);
            getdata(1, 5);
        } else {
            setPostsperpage(e.target.value);
            setCurrentpage(1);
            getdata(1, e.target.value);
        }
    }
    async function UpdateProductStatus(e, id) {
        let postdata = { pid: id, status: e.target.value };
        let result = await fetch(`${API_URL}/access/updateproductstatus`, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${ADMIN.bearer_token}` },
            body: JSON.stringify(postdata)
        });
        result = await result.json();
        if (result.status === 200) {
            alert(result.message);
        } else {
            console.error(result);
        }
    }
    async function UpdateStock(id, cu) {
        let el = document.getElementById(`stock${id}`);
        let postdata = { pid: id, stock: el.value };
        let result = await fetch(`${API_URL}/access/updateproductquantity`, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${ADMIN.bearer_token}` },
            body: JSON.stringify(postdata)
        });
        result = await result.json();
        if (result.status === 200) {
            el.value = "";
            alert(result.message);
            getdata(1, 5);
        } else {
            console.error(result);
        }
    }
    return (
        <Fragment>
            <h2 style={{ textDecoration: "underline", textAlign: "center" }}>
                Product List
                {
                    load ? <img src="../images/loading-gif.gif" alt="" style={{ width: "50px", height: "50px" }} /> : ""
                }
            </h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan={5}>
                            <select id='limit' name='limit' onChange={(e) => changeperPage(e)} className='limit'>
                                <option defaultValue={5}>Limit</option>
                                {
                                    limitval.map((item, index) =>
                                        <option defaultValue={item} key={index}>{item}</option>
                                    )
                                }
                            </select>
                        </th>
                        <th colSpan={5} style={{ textAlign: "right" }}>
                            {fromto.to} of {alltotal}
                        </th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Sub-category</th>
                        <th>Brand</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Available Stock</th>
                        <th>Description</th>
                        <th>Photo</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        newdata.map((item, index) =>
                            <tr key={index} id={index}>
                                <td>{fromto.from++}</td>
                                <td>{item.cat_name}</td>
                                <td>{item.subname}</td>
                                <td>{item.brand_name}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td align='center'>
                                    <p>{item.available_stock}</p>
                                    <input type="number" id={"stock" + item.id} placeholder="Add Quantity" style={{ width: '48%', borderRadius: '5px', border: '1px solid black', height: '30px' }} />
                                    <button type="button" className="btn btn-primary btn-sm" style={{ marginTop: '-4px' }} onClick={() => UpdateStock(item.id, item.available_stock)}><i className="fa fa-floppy-o" aria-hidden="true" /></button>
                                </td>
                                <td>
                                    <textarea defaultValue={item.description} ></textarea>
                                </td>
                                <td>
                                    <img src={"http://127.0.0.1:8000/products/" + item.product_img} alt="" style={{ width: "40px", height: "50px" }} />
                                </td>
                                <td>

                                    <button className='btn btn-danger btn-sm' onClick={() => deleteis(item)}>Delete</button>
                                    <Link className='btn btn-warning btn-sm' to={"/cpanel/update?id=" + item.id} style={{ marginLeft: '5px' }}>Edit</Link>

                                    <select onChange={(e) => UpdateProductStatus(e, item.id)} className='btn btn-info btn-sm' style={{ marginLeft: '5px' }} defaultValue={item.pstatus}>
                                        <option value={1} >Active</option>
                                        <option value={0} >Inactive</option>
                                    </select>

                                </td>
                            </tr>
                        )
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={10} align='center'>
                            <Pagination pageSize={postsperpage} total={alltotal} current={currentpage} onChange={(value) => changePage(value)} showQuickJumper />
                            {/* onShowSizeChange={onShowSizeChange} */}
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </Fragment>
    )
}
export default ProductList;