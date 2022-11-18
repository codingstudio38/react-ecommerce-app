import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/AddProduct.css';
import { API_URL, ADMIN_DETAILS, LOGOUT_URL } from '../Services/Constant';
function AddProduct(props) {

    const ADMIN = ADMIN_DETAILS();
    const navigate = useNavigate();
    const [cat, setCat] = useState("");
    const [subcat, setSubcat] = useState("");
    const [brand, setBrand] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [productimg, setProductimg] = useState("");

    const [catcheck, setCatcheck] = useState("");
    const [subcatcheck, setSubcatcheck] = useState("");
    const [brandcheck, setBrandcheck] = useState("");
    const [namecheck, setNamecheck] = useState("");
    const [pricecheck, setPricecheck] = useState("");
    const [descriptioncheck, setDescriptioncheck] = useState("");
    const [productimgcheck, setProductimgcheck] = useState("");

    const [categorylist, setCategorylist] = useState([]);
    const [subcategorylist, setSubcategorylist] = useState([]);
    const [brandlist, setBrandlist] = useState([]);
    useEffect(() => {
        document.title = "Admin - Add Product";
        if (ADMIN_DETAILS() === false) {
            window.localStorage.clear();
            // window.location.href = LOGOUT_URL;
            navigate('/login');
        }
        getcategorylist();
        getbrandlist();
    }, [])
    function AddProduct() {
        if (cat === "0") {
            setCatcheck(" error"); return false;
        } else {
            setCatcheck(" seccess");
        }
        if (subcat === "0") {
            setSubcatcheck(" error"); return false;
        } else {
            setSubcatcheck(" seccess");
        }
        if (brand === "0") {
            setBrandcheck(" error"); return false;
        } else {
            setBrandcheck(" seccess");
        }
        if (name === "") {
            setNamecheck(" error"); return false;
        } else {
            setNamecheck(" seccess");
        }
        if (price === "") {
            setPricecheck(" error"); return false;
        } else {
            setPricecheck(" seccess");
        }
        if (description === "") {
            setDescriptioncheck(" error"); return false;
        } else {
            setDescriptioncheck(" seccess");
        }
        if (productimg === "") {
            setProductimgcheck(" error"); return false;
        } else {
            setProductimgcheck(" seccess");
        }

        const myform = new FormData();
        myform.append('cat', cat);
        myform.append('subcat', subcat);
        myform.append('brand', brand);
        myform.append('name', name);
        myform.append('price', price);
        myform.append('description', description);
        myform.append('productimg', productimg);
        //props.addProductHandler(myform);
        axios({
            method: "POST",
            url: `${API_URL}/access/addproduct`,
            data: myform,
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${ADMIN.bearer_token}` }
        }).then(function (response) {
            if (response.status === 200) {
                if (response.data.status === 200) {
                    console.clear();
                    setCatcheck("");
                    setSubcatcheck("");
                    setBrandcheck("");
                    setName("");
                    setPrice("");
                    setDescription("");
                    setProductimg("");
                    document.getElementById("myform").reset();
                    alert(response.data.message);
                    navigate('../view');
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
    async function getcategorylist() {
        let result = await fetch(`${API_URL}/access/categorylist?columns=id-name`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN.bearer_token}`,
            }
        });
        result = await result.json();
        if (result.status === 200) {
            setCategorylist(result.data);
        } else {
            alert(result.message);
        }
    }
    async function getsubcategorylist(val) {
        let result = await fetch(`${API_URL}/access/subcategorysearch?cat_id=${val}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN.bearer_token}`,
            }
        });
        result = await result.json();
        if (result.status === 200) {
            setCat(val);
            setSubcategorylist(result.data);
        } else {
            alert(result.message);
        }
    }
    async function getbrandlist() {
        let result = await fetch(`${API_URL}/access/brandlist?columns=id-name`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN.bearer_token}`,
            }
        });
        result = await result.json();
        if (result.status === 200) {
            setBrandlist(result.data);
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
                            <div className="card-header">Add Product</div>
                            <div className="card-body">

                                <form className="form-horizontal" id="myform">
                                    <div className="form-group">
                                        <label className="cols-sm-2 control-label">Category</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">
                                                <select id="categoryid" className={"form-control" + catcheck} onChange={(e) => getsubcategorylist(e.target.value)}>
                                                    <option defaultValue='0'>--Select--</option>
                                                    {
                                                        categorylist.map((item, index) =>
                                                            <option value={item.id} key={index}>{item.name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="cols-sm-2 control-label">Sub-category</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">
                                                <select id="subcategoryid" className={"form-control" + subcatcheck} onChange={(e) => setSubcat(e.target.value)}>
                                                    <option defaultValue='0'>--Select--</option>
                                                    {
                                                        subcategorylist.map((item, index) =>
                                                            <option value={item.id} key={index}>{item.name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="cols-sm-2 control-label">Brand</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">
                                                <select id="brandid" className={"form-control" + brandcheck} onChange={(e) => setBrand(e.target.value)}>
                                                    <option defaultValue='0'>--Select--</option>
                                                    {
                                                        brandlist.map((item, index) =>
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

                                                <input type="text" className={"form-control" + namecheck} name="name" id="name" placeholder="Enter your Name" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="cols-sm-2 control-label">Price</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">

                                                <input type="number" className={"form-control" + pricecheck} name="price" id="price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="cols-sm-2 control-label">Description</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">

                                                <textarea className={"form-control" + descriptioncheck} name="description" id="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="cols-sm-2 control-label">Photo</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">

                                                <input type="file" className={"form-control" + productimgcheck} name="myimg" id="myimg" onChange={(e) => setProductimg(e.target.files[0])} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mt-3">
                                        <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={AddProduct}>Add Product</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </Fragment >
    )
}
export default AddProduct;