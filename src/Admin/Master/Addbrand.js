import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL, ADMIN_DETAILS, LOGOUT_URL } from '../../Services/Constant';
import '../../css/AddProduct.css';
import { Pagination } from 'antd';

function Addbrand(props) {
    const ADMIN = ADMIN_DETAILS();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [logo, setLogo] = useState("");
    const [namecheck, setNamecheck] = useState("");
    const [logocheck, setLogocheck] = useState("");
    const apiurl = API_URL;

    const [currentpage, setCurrentpage] = useState(1);
    const [postsperpage, setPostsperpage] = useState(5);
    const [categorylist, setCategorylist] = useState([]);
    const [limit, setLimit] = useState([]);
    var [to, setTo] = useState(0);
    var [from, setFrom] = useState(0);
    const [totallogo, setTotallogo] = useState(0);
    const [loadlogo, setLoadlogo] = useState(false);
    useEffect(() => {
        if (ADMIN_DETAILS() === false) {
            window.localStorage.clear();
            // window.location.href = LOGOUT_URL;
            navigate('/login');
        }
        getlogo(1, 5);
    }, [])
    function AddCat() {
        if (name == "") {
            setNamecheck(" error"); return false;
        } else {
            setNamecheck(" seccess");
        }
        if (logo == "") {
            setLogocheck(" error"); return false;
        } else {
            setLogocheck(" seccess");
        }

        const myform = new FormData();
        myform.append('name', name);
        myform.append('logo', logo);
        // props.addbrandHandler(myform);
        axios({
            method: "POST",
            url: `${apiurl}/access/addbrand`,
            data: myform,
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${ADMIN.bearer_token}` }
        }).then(function (response) {
            if (response.status === 200) {
                if (response.data.status === 200) {
                    console.clear();
                    setNamecheck("");
                    setLogocheck("");
                    setName("");
                    setLogo("");
                    document.getElementById("myform").reset();
                    alert(response.data.message);
                    getlogo(1, 5);
                } else {
                    console.clear();
                    console.error(`Response status code ${response.data.status} || ${response.data.message}`);
                }
            } else {
                console.clear();
                console.error(`Network status code ${response.status}`);
            }
        }).catch(function (response) {
            console.clear();
            console.error(response);
        });
    }

    async function getlogo(p, l) {
        setLoadlogo(true);
        let result = await fetch(`${apiurl}/access/viewbrand?page=${p}&limit=${l}&columns=id-name-logo`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN.bearer_token}`
            }
        });
        result = await result.json();
        if (result.status === 200) {
            setPostsperpage(result.data.per_page);
            setCurrentpage(result.data.current_page);
            setCategorylist(result.data.data);
            setTo(result.data.to);
            setFrom(result.data.from);
            setTotallogo(result.data.total);
            if (result.data.total <= 5) {
                setLimit([5]);
            } else if (result.data.total <= 10) {
                setLimit([5, 10]);
            } else if (result.data.total <= 25) {
                setLimit([5, 10, 25]);
            } else if (result.data.total <= 50) {
                setLimit([5, 10, 25, 50]);
            } else if (result.data.total <= 100) {
                setLimit([5, 10, 25, 50, 100]);
            } else {
                setLimit([5, 10, 25, 50, 100]);
            }
            setLoadlogo(false);
        } else {
            alert(result.message);
        }
    }
    async function deleteis(data) {
        if (window.confirm("Are you sure ?")) {
            let result = await fetch(`${apiurl}/access/deletebrand?deleteid=${data.id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ADMIN.bearer_token}`
                }
            });
            result = await result.json();
            if (result.status == 200) {
                getlogo(1, 5);
            } else {
                alert(result.message);
            }
        }
    }
    function changeperPagecat(e) {
        if (e.target.value == "Limit") {
            setPostsperpage(5);
            setCurrentpage(1);
            getlogo(1, 5);
        } else {
            setPostsperpage(e.target.value);
            setCurrentpage(1);
            getlogo(1, e.target.value);
        }
    }
    function changePagecat(val) {
        getlogo(val, postsperpage);
    }
    ////for modal///
    const [show, setShow] = useState(false);
    const handleCateModalClose = () => {
        setOldphoto("");
        setRowid("")
        setShow(false);
    }
    const handleCateModalShow = (data) => {
        setOldphoto(data.logo);
        setRowid(data.id);
        setNewname(data.name);
        setShow(true)
    };
    const [newname, setNewname] = useState("");
    const [newlogo, setNewlogo] = useState("");
    const [oldphoto, setOldphoto] = useState("");
    const [rowid, setRowid] = useState("");
    const [newnamecheck, setNewnamecheck] = useState("");
    function UpdateItem() {
        if (newname == "") {
            setNewnamecheck(" error"); return false;
        }
        const myform = new FormData();
        myform.append('name', newname);
        myform.append('newlogo', newlogo);
        myform.append('oldphoto', oldphoto);
        myform.append('rowid', rowid);
        axios({
            method: "POST",
            url: `${apiurl}/access/updatebrand`,
            data: myform,
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${ADMIN.bearer_token}` }
        }).then(function (response) {
            if (response.status === 200) {
                if (response.data.status === 200) {
                    console.clear();
                    setNewnamecheck("");
                    setNewname("");
                    setRowid("");
                    setOldphoto("");
                    setNewlogo("");
                    document.getElementById("mynewform").reset();
                    alert(response.data.message);
                    getlogo(1, 5);
                    handleCateModalClose();
                } else {
                    console.clear();
                    console.error(`Response status code ${response.data.status} || ${response.data.message}`);
                }
            } else {
                console.clear();
                console.error(`Network status code ${response.status}`);
            }
        }).catch(function (response) {
            console.clear();
            console.error(response);
        });
    }
    async function UpdateBrandStatus(e, id) {
        let postdata = { bid: id, status: e.target.value };
        let result = await fetch(`${API_URL}/access/updatebrandstatus`, {
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
    return (
        <Fragment>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card" style={{ height: "485px", border: "1px solid black" }}>
                            <div className="card-header text-center">Add Brand</div>
                            <div className="card-body" style={{ marginTop: "30px" }}>
                                <form className="form-horizontal" id="myform">
                                    <div className="form-group">
                                        <label className="cols-sm-2 control-label">Name</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">

                                                <input type="text" className={"form-control" + namecheck} name="name" id="name" placeholder="Enter your Name" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="cols-sm-2 control-label">Brand Logo</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">

                                                <input type="file" className={"form-control" + logocheck} name="myimg" id="myimg" onChange={(e) => setLogo(e.target.files[0])} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mt-3">
                                        <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={AddCat}>Add Brand</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <Fragment>
                            <div style={{ height: "485px", overflowY: "scroll", border: "1px solid black", borderRadius: "6px" }}>


                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th colSpan={2} width="50%">
                                                <select id='limit' name='limit' onChange={(e) => changeperPagecat(e)} className='limit'>
                                                    <option defaultValue='5'>Limit</option>
                                                    {
                                                        limit.map((item, index) =>
                                                            <option value={item} key={index}>{item}</option>
                                                        )
                                                    }
                                                </select>
                                                {
                                                    loadlogo ? <img src="../images/loading-gif.gif" alt="" style={{ width: "40px", height: "40px" }} /> : ""
                                                }
                                            </th>
                                            <th colSpan={2} width="50%" style={{ textAlign: "right" }}>
                                                {to} of {totallogo}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Photo</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            categorylist.map((item, index) =>
                                                <tr key={index} id={index}>
                                                    <td>{from++}</td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <img src={"http://127.0.0.1:8000/brands/" + item.logo} alt="" style={{ width: "40px", height: "50px" }} />
                                                    </td>
                                                    <td>
                                                        <button className='btn btn-danger btn-sm' onClick={() => deleteis(item)}>Delete</button>
                                                        <button className='btn btn-warning btn-sm' style={{ marginLeft: '5px' }} onClick={() => handleCateModalShow(item)}>Edit</button>
                                                        {
                                                            item.status == "1" ?
                                                                <select onChange={(e) => UpdateBrandStatus(e, item.id)} className='btn btn-info btn-sm' style={{ marginLeft: '5px' }}>
                                                                    <option value={1} selected>Active</option>
                                                                    <option value={0} >Inactive</option>
                                                                </select>
                                                                :
                                                                <select onChange={(e) => UpdateBrandStatus(e, item.id)} className='btn btn-info btn-sm' style={{ marginLeft: '5px' }}>
                                                                    <option value={1} >Active</option>
                                                                    <option value={0} selected>Inactive</option>
                                                                </select>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={4} align='center'>
                                                <Pagination pageSize={postsperpage} total={totallogo} current={currentpage} onChange={(value) => changePagecat(value)} showQuickJumper />
                                            </td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </div>
                        </Fragment>
                    </div>
                </div>
            </div >
            <Modal show={show} onHide={handleCateModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal" id="mynewform">
                        <div className="form-group">
                            <label className="cols-sm-2 control-label">Name</label>
                            <div className="cols-sm-10">
                                <div className="input-group">

                                    <input type="text" className={"form-control" + newnamecheck} name="name" id="name" placeholder="Enter your Name" value={newname} onChange={(e) => setNewname(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="cols-sm-2 control-label">Category Icon </label><img src={"http://127.0.0.1:8000/brands/" + oldphoto} style={{ width: "40px", height: "50px", marginTop: "5px", marginBottom: "5px" }} />
                            <div className="cols-sm-10">
                                <div className="input-group">

                                    <input type="file" className="form-control" name="newimg" id="newimg" onChange={(e) => setNewlogo(e.target.files[0])} />
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCateModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={UpdateItem}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment >
    )
}
export default Addbrand;