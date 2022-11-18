import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { API_URL, ADMIN_DETAILS, LOGOUT_URL } from '../../Services/Constant';
import '../../css/AddProduct.css';
import { Pagination } from 'antd';
function Addsubcategory(props) {
    // console.log(props);
    const ADMIN = ADMIN_DETAILS();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [categoryid, setCategoryid] = useState("");
    const [subcategoryimg, setSubcategoryimg] = useState("");
    const [namecheck, setNamecheck] = useState("");
    const [categoryidcheck, setCategoryidcheck] = useState("");
    const [productimgcheck, setProductimgcheck] = useState("");
    const apiurl = API_URL;

    const [currentpagesubcat, setCurrentpagesubcat] = useState(1);
    const [postsperpagesubcat, setPostsperpagesubcat] = useState(5);
    const [subcategorylist, setSucategorylist] = useState([]);
    const [limitval, setCatlimit] = useState([]);
    const [to, setTo] = useState(0);
    var [from, setFrom] = useState(0);
    const [totalsubcategory, setTotalsubcategory] = useState(0);

    const [selectlist, setSelectlist] = useState([]);
    const [categoryload, setCategoryload] = useState(false);
    useEffect(() => {
        if (ADMIN_DETAILS() === false) {
            window.localStorage.clear();
            // window.location.href = LOGOUT_URL;
            navigate('/login');
        }
        getcategory(1, 5);
        getcategorylist();
    }, [])
    function AddCat() {
        if (categoryid === "") {
            setCategoryidcheck(" error"); return false;
        } else {
            setCategoryidcheck(" seccess");
        }
        if (name === "") {
            setNamecheck(" error"); return false;
        } else {
            setNamecheck(" seccess");
        }
        if (subcategoryimg === "") {
            setProductimgcheck(" error"); return false;
        } else {
            setProductimgcheck(" seccess");
        }
        const myform = new FormData();
        myform.append('name', name);
        myform.append('subcategoryimg', subcategoryimg);
        myform.append('category_id', categoryid);
        // props.addsubcategoryHandler(myform);
        axios({
            method: "POST",
            url: `${apiurl}/access/addsubcategory`,
            data: myform,
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${ADMIN.bearer_token}` }
        }).then(function (response) {
            if (response.status === 200) {
                if (response.data.status === 200) {
                    console.clear();
                    setName("");
                    setCategoryid("");
                    setSubcategoryimg("");
                    setCategoryidcheck("");
                    setNamecheck("");
                    setProductimgcheck("");
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
        let result = await fetch(`${apiurl}/access/viewsubcategory?page=${p}&limit=${l}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN.bearer_token}`,
            }
        });
        result = await result.json();
        if (result.status === 200) {
            setPostsperpagesubcat(result.data.per_page);
            setCurrentpagesubcat(result.data.current_page);
            setSucategorylist(result.data.data);
            setTo(result.data.to);
            setFrom(result.data.from);
            setTotalsubcategory(result.data.total);
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
            let result = await fetch(`${apiurl}/access/deletesubcategory?deleteid=${data.id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ADMIN.bearer_token}`,
                }
            });
            result = await result.json();
            if (result.status === 400) {
                alert(result.message);
            } else {
                getcategory(1, 5);
            }

        }
    }
    function changeperPagecat(e) {
        if (e.target.value === "Limit") {
            setPostsperpagesubcat(5);
            setCurrentpagesubcat(1);
            getcategory(1, 5);
        } else {
            setPostsperpagesubcat(e.target.value);
            setCurrentpagesubcat(1);
            getcategory(1, e.target.value);
        }
    }
    function changePagecat(val) {
        getcategory(val, postsperpagesubcat);
    }
    async function getcategorylist() {
        let result = await fetch(`${apiurl}/access/categorylist?columns=id-name`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN.bearer_token}`,
            }
        });
        result = await result.json();
        if (result.status === 200) {
            setSelectlist(result.data);
        } else {
            alert(result.message);
        }
    }
    ////for modal///
    const [show, setShow] = useState(false);
    const handleCateModalClose = () => {
        setOldphoto("");
        setRowid("");
        setNewcatid("");
        setShow(false);
    }
    const handleCateModalShow = (data) => {
        setOldphoto(data.img);
        setRowid(data.id);
        setNewname(data.subname);
        setNewcatid(data.categoryid);
        setShow(true);
    };
    const [newname, setNewname] = useState("");
    const [newlogo, setNewlogo] = useState("");
    const [newcatid, setNewcatid] = useState("");
    const [oldphoto, setOldphoto] = useState("");
    const [rowid, setRowid] = useState("");
    const [newnamecheck, setNewnamecheck] = useState("");
    const [newcatidcheck, setCatidcheck] = useState("");
    function UpdateItem() {
        if (newcatid === "0" || newcatid === "") {
            setCatidcheck(" error"); return false;
        } else {
            setCatidcheck(" seccess");
        }
        if (newname === "") {
            setNewnamecheck(" error"); return false;
        } else {
            setNewnamecheck(" seccess");
        }
        const newform = new FormData();
        newform.append('name', newname);
        newform.append('subcategoryimg', newlogo);
        newform.append('rowid', rowid);
        newform.append('oldphoto', oldphoto);
        newform.append('categoryid', newcatid);
        axios({
            method: "POST",
            url: `${apiurl}/access/updatesubcategory`,
            data: newform,
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${ADMIN.bearer_token}` }
        }).then(function (response) {
            if (response.status === 200) {
                if (response.data.status === 200) {
                    console.clear();
                    setOldphoto("");
                    setRowid("");
                    setNewname("");
                    setNewcatid("");
                    setCatidcheck("");
                    setNewnamecheck("");
                    document.getElementById("mynewform").reset();
                    alert(response.data.message);
                    getcategory(1, 5);
                    setShow(false);
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
    async function UpdatesubCategoryStatus(e, id) {
        let postdata = { scid: id, status: e.target.value };
        let result = await fetch(`${API_URL}/access/updatesubcategorystatus`, {
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
                            <div className="card-header text-center">Add Sub-Category</div>
                            <div className="card-body" style={{ marginTop: "30px" }}>
                                <form className="form-horizontal" id="myform">
                                    <div className="form-group">
                                        <label className="cols-sm-2 control-label">Select Category</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">
                                                <select id="categoryid" className={"form-control" + categoryidcheck} onChange={(e) => setCategoryid(e.target.value)}>
                                                    <option defaultValue='0'>--Select--</option>
                                                    {
                                                        selectlist.map((item, index) =>
                                                            <option value={item.id} key={index}>{item.name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="cols-sm-2 control-label">Sub-Category Name</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">

                                                <input type="text" className={"form-control" + namecheck} name="name" id="name" placeholder="Enter your Name" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="cols-sm-2 control-label">Photo</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">

                                                <input type="file" className={"form-control" + productimgcheck} name="myimg" id="myimg" onChange={(e) => setSubcategoryimg(e.target.files[0])} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mt-3">
                                        <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={AddCat}>Add Sub-Category</button>
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
                                            <th colSpan={3} width="50%" style={{ textAlign: "right" }}>
                                                {to} of {totalsubcategory}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>#</th>
                                            <th>Category</th>
                                            <th>Name</th>
                                            <th>Photo</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            subcategorylist.map((item, index) =>
                                                <tr key={index} id={index}>
                                                    <td>{from++}</td>
                                                    <td>{item.categoryname}</td>
                                                    <td>{item.subname}</td>
                                                    <td>
                                                        <img src={"http://127.0.0.1:8000/sub-category/" + item.img} alt="" style={{ width: "40px", height: "50px" }} />
                                                    </td>
                                                    <td>
                                                        <button className='btn btn-danger btn-sm' onClick={() => deleteis(item)}>Delete</button>
                                                        <button className='btn btn-warning btn-sm' onClick={() => handleCateModalShow(item)} style={{ marginLeft: '5px' }}>Edit</button>
                                                        {
                                                            item.status == "1" ?
                                                                <select onChange={(e) => UpdatesubCategoryStatus(e, item.id)} className='btn btn-info btn-sm' style={{ marginLeft: '5px' }}>
                                                                    <option value={1} selected>Active</option>
                                                                    <option value={0} >Inactive</option>
                                                                </select>
                                                                :
                                                                <select onChange={(e) => UpdatesubCategoryStatus(e, item.id)} className='btn btn-info btn-sm' style={{ marginLeft: '5px' }}>
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
                                            <td colSpan={5} align='center'>
                                                <Pagination pageSize={postsperpagesubcat} total={totalsubcategory} current={currentpagesubcat} onChange={(value) => changePagecat(value)} showQuickJumper />
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
                            <label className="cols-sm-2 control-label">Select Category</label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <select id="categoryid" className={"form-control" + newcatidcheck} onChange={(e) => setNewcatid(e.target.value)}>
                                        <option defaultValue='0'>--Select--</option>
                                        {
                                            selectlist.map((item, index) =>
                                                item.id == newcatid ?
                                                    <option value={item.id} key={index} selected>{item.name}</option>
                                                    :
                                                    <option value={item.id} key={index}>{item.name}</option>

                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="cols-sm-2 control-label">Name</label>
                            <div className="cols-sm-10">
                                <div className="input-group">

                                    <input type="text" className={"form-control" + newnamecheck} name="name" id="name" placeholder="Enter your Name" value={newname} onChange={(e) => setNewname(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="cols-sm-2 control-label">Category Icon </label><img src={"http://127.0.0.1:8000/sub-category/" + oldphoto} style={{ width: "40px", height: "50px", marginTop: "5px", marginBottom: "5px" }} />
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
export default Addsubcategory;