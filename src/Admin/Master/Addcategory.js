import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { API_URL, ADMIN_DETAILS, LOGOUT_URL } from '../../Services/Constant';
import '../../css/AddProduct.css';
import { Pagination } from 'antd';
function Addcategory(props) {
    // console.log(props);
    const ADMIN = ADMIN_DETAILS();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [categoryimg, setCategoryimg] = useState("");
    const [namecheck, setNamecheck] = useState("");
    const [productimgcheck, setProductimgcheck] = useState("");
    const apiurl = API_URL;

    const [currentpagecat, setCurrentpagecat] = useState(1);
    const [postsperpagecat, setPostsperpagecat] = useState(5);
    const [categorylist, setCategorylist] = useState([]);
    const [limitval, setCatlimit] = useState([]);
    var [to, setTo] = useState(0);
    var [from, setFrom] = useState(0);
    const [totalcategory, setTotalcategory] = useState(0);
    const [categoryload, setCategoryload] = useState(false);
    useEffect(() => {
        if (ADMIN_DETAILS() === false) {
            window.localStorage.clear();
            // window.location.href = LOGOUT_URL;
            navigate('/login');
        }
        getcategory(1, 5);
        document.title = "Admin - Manage Category";
    }, [])
    function AddCat() {
        if (name === "") {
            setNamecheck(" error"); return false;
        } else {
            setNamecheck(" seccess");
        }
        if (categoryimg === "") {
            setProductimgcheck(" error"); return false;
        } else {
            setProductimgcheck(" seccess");
        }
        const myform = new FormData();
        myform.append('name', name);
        myform.append('categoryimg', categoryimg);
        // props.addcategoryHandler(myform);
        axios({
            method: "POST",
            url: `${apiurl}/access/addcategory`,
            data: myform,
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${ADMIN.bearer_token}` }
        }).then(function (response) {
            if (response.status === 200) {
                if (response.data.status === 200) {
                    console.clear();
                    setNamecheck("");
                    setProductimgcheck("");
                    setName("");
                    setCategoryimg("");
                    document.getElementById("myform").reset();
                    alert(response.data.message);
                    getcategory(1, 5);
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

    async function getcategory(p, l) {
        setCategoryload(true);
        let result = await fetch(`${apiurl}/access/viewcategory?page=${p}&limit=${l}&columns=id-name-category_img`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN.bearer_token}`,
            }
        });
        result = await result.json();
        if (result.status === 200) {
            setPostsperpagecat(result.data.per_page);
            setCurrentpagecat(result.data.current_page);
            setCategorylist(result.data.data);
            setTo(result.data.to);
            setFrom(result.data.from);
            setTotalcategory(result.data.total);
            if (result.data.total <= 5) {
                setCatlimit([5]);
            } else if (result.data.total <= 10) {
                setCatlimit([5, 10]);
            } else if (result.data.total <= 25) {
                setCatlimit([5, 10, 25]);
            } else if (result.data.total <= 50) {
                setCatlimit([5, 10, 25, 50]);
            } else if (result.data.total <= 100) {
                setCatlimit([5, 10, 25, 50, 100]);
            } else {
                setCatlimit([5, 10, 25, 50, 100]);
            }
            setCategoryload(false);
        } else {
            alert(result.message); return;
        }
    }
    async function deleteis(data) {
        if (window.confirm("Are you sure ?")) {
            let result = await fetch(`${apiurl}/access/deletecategory?deleteid=${data.id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ADMIN.bearer_token}`,
                }
            });
            result = await result.json();
            if (result.status === 200) {
                getcategory(1, 5);
            } else {
                alert(result.message);
            }
        }
    }
    function changeperPagecat(e) {
        if (e.target.value === "Limit") {
            setPostsperpagecat(5);
            setCurrentpagecat(1);
            getcategory(1, 5);
        } else {
            setPostsperpagecat(e.target.value);
            setCurrentpagecat(1);
            getcategory(1, e.target.value);
        }
    }
    function changePagecat(val) {
        getcategory(val, postsperpagecat);
    }
    ////for modal///
    const [show, setShow] = useState(false);
    const handleCateModalClose = () => {
        setOldphoto("");
        setRowid("")
        setShow(false);
    }
    const handleCateModalShow = (data) => {
        setOldphoto(data.category_img);
        setRowid(data.id);
        setNewname(data.name);
        setShow(true)
    };
    const [newname, setNewname] = useState("");
    const [newimg, setNewimg] = useState("");
    const [oldphoto, setOldphoto] = useState("");
    const [rowid, setRowid] = useState("");
    const [newnamecheck, setNewnamecheck] = useState("");
    function UpdateItem() {
        if (newname === "") {
            setNewnamecheck(" error"); return false;
        }
        const mynewform = new FormData();
        mynewform.append('name', newname);
        mynewform.append('oldphoto', oldphoto);
        mynewform.append('rowid', rowid);
        mynewform.append('categoryimg', newimg);
        axios({
            method: "POST",
            url: `${apiurl}/access/updatecategory`,
            data: mynewform,
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${ADMIN.bearer_token}` }
        }).then(function (response) {
            if (response.status === 200) {
                if (response.data.status === 200) {
                    console.clear();
                    setNewnamecheck("");
                    setNewname("");
                    setNewimg("");
                    setOldphoto("");
                    setRowid("");
                    document.getElementById("mynewform").reset();
                    alert(response.data.message);
                    getcategory(1, 5);
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
    async function UpdateCategoryStatus(e, id) {
        let postdata = { cid: id, status: e.target.value };
        let result = await fetch(`${API_URL}/access/updatecategorystatus`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN.bearer_token}`,
            },
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
                            <div className="card-header text-center">Add Category</div>
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
                                        <label className="cols-sm-2 control-label">Category Icon</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">

                                                <input type="file" className={"form-control" + productimgcheck} name="myimg" id="myimg" onChange={(e) => setCategoryimg(e.target.files[0])} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mt-3">
                                        <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={AddCat}>Add Category</button>
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
                                                        limitval.map((item, index) =>
                                                            <option value={item} key={index}>{item}</option>
                                                        )
                                                    }
                                                </select>
                                                {
                                                    categoryload ? <img src="../images/loading-gif.gif" alt="" style={{ width: "40px", height: "40px" }} /> : ""
                                                }
                                            </th>
                                            <th colSpan={2} width="50%" style={{ textAlign: "right" }}>
                                                {to} of {totalcategory}
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
                                                        <img src={"http://127.0.0.1:8000/category/" + item.category_img} alt="" style={{ width: "40px", height: "50px" }} />
                                                    </td>
                                                    <td>
                                                        <button className='btn btn-danger btn-sm' onClick={() => deleteis(item)}>Delete</button>
                                                        <button className='btn btn-warning btn-sm' style={{ marginLeft: '5px' }} onClick={() => handleCateModalShow(item)}>Edit</button>
                                                        {
                                                            item.status === "1" ?
                                                                <select onChange={(e) => UpdateCategoryStatus(e, item.id)} className='btn btn-info btn-sm' style={{ marginLeft: '5px' }}>
                                                                    <option value={1} selected>Active</option>
                                                                    <option value={0} >Inactive</option>
                                                                </select>
                                                                :
                                                                <select onChange={(e) => UpdateCategoryStatus(e, item.id)} className='btn btn-info btn-sm' style={{ marginLeft: '5px' }}>
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
                                                <Pagination pageSize={postsperpagecat} total={totalcategory} current={currentpagecat} onChange={(value) => changePagecat(value)} showQuickJumper />
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
                            <label className="cols-sm-2 control-label">Category Icon </label><img src={"http://127.0.0.1:8000/category/" + oldphoto} style={{ width: "40px", height: "50px", marginTop: "5px", marginBottom: "5px" }} />
                            <div className="cols-sm-10">
                                <div className="input-group">

                                    <input type="file" className="form-control" name="newimg" id="newimg" onChange={(e) => setNewimg(e.target.files[0])} />
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
export default Addcategory;