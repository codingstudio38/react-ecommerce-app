import React, { useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import '../css/AddProduct.css';
import { API_URL, ADMIN_DETAILS, LOGOUT_URL } from '../Services/Constant';
function UpdateProduct(props) {
    const apiurl = API_URL;
    // const params = useParams();
    // const { id } = params;
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [cat, setCat] = useState("");
    const [subcat, setSubcat] = useState("");
    const [brand, setBrand] = useState("");
    const [pid, setPid] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [productimg, setProductimg] = useState("");
    const [productimgname, setProductimgname] = useState("");

    const [catcheck, setCatcheck] = useState("");
    const [subcatcheck, setSubcatcheck] = useState("");
    const [brandcheck, setBrandcheck] = useState("");
    const [namecheck, setNamecheck] = useState("");
    const [pricecheck, setPricecheck] = useState("");
    const [descriptioncheck, setDescriptioncheck] = useState("");

    const [categorylist, setCategorylist] = useState([]);
    const [subcategorylist, setSubcategorylist] = useState([]);
    const [brandlist, setBrandlist] = useState([]);
    const ADMIN = ADMIN_DETAILS();
    useEffect(() => {
        document.title = "Admin - Update Product";
        if (ADMIN_DETAILS() === false) {
            window.localStorage.clear();
            // window.location.href = LOGOUT_URL;
            navigate('/login');
        }
        if (searchParams.get('id') == null || searchParams.get('id') === "") {
            navigate('../view'); return;
        }
        getProduct(searchParams.get('id'));
        getcategorylist();
        getbrandlist();
    }, []);
    async function getProduct(id) {
        let result = await fetch(`${apiurl}/access/productdetail/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN.bearer_token}`,
            }
        });
        result = await result.json();
        if (result.status === 200) {
            setCat(result.data.category_id);
            setSubcat(result.data.sub_category_id);
            setBrand(result.data.brand_id);
            setPid(result.data.id);
            setName(result.data.name);
            setPrice(result.data.price);
            setDescription(result.data.description);
            setProductimgname(result.data.product_img);
            getsubcategorylist(result.data.category_id);
        } else {
            alert(result.message);
            navigate('../view');
        }
    }
    async function UpdateProduct() {
        if (cat == "0") {
            setCatcheck(" error"); return false;
        } else {
            setCatcheck(" seccess");
        }
        if (subcat == "0") {
            setSubcatcheck(" error"); return false;
        } else {
            setSubcatcheck(" seccess");
        }
        if (brand == "0") {
            setBrandcheck(" error"); return false;
        } else {
            setBrandcheck(" seccess");
        }
        if (name == "") {
            setNamecheck(" error"); return false;
        } else {
            setNamecheck(" seccess");
        }
        if (price == "") {
            setPricecheck(" error"); return false;
        } else {
            setPricecheck(" seccess");
        }
        if (description == "") {
            setDescriptioncheck(" error"); return false;
        } else {
            setDescriptioncheck(" seccess");
        }

        const myform = new FormData();
        myform.append('cat', cat);
        myform.append('subcat', subcat);
        myform.append('brand', brand);
        myform.append('id', pid);
        myform.append('name', name);
        myform.append('price', price);
        myform.append('description', description);
        myform.append('productimg', productimg);
        myform.append('ofile', productimgname);
        let result = await fetch(`${apiurl}/access/updateproduct/`, {
            method: 'POST',
            body: myform,
            headers: {
                'Authorization': `Bearer ${ADMIN.bearer_token}`,
            }
        });
        result = await result.json();
        if (result.status === 200) {
            console.clear();
            setPid("");
            setName("");
            setPrice("");
            setDescription("");
            setProductimg("");
            setProductimgname("");
            document.getElementById("myform").reset();
            alert(result.message);
            navigate('../view');
        } else {
            alert(result.message);
            console.clear();
            console.error(`Response status code ${result.status}. message -${result.message} `);
        }
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
        if (result.status == 200) {
            setCategorylist(result.data);
        } else {
            alert(result.message);
        }
    }
    async function getsubcategorylist(id) {
        let result = await fetch(`${API_URL}/access/subcategorysearch?cat_id=${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN.bearer_token}`,
            }
        });
        result = await result.json();
        if (result.status == 200) {
            setSubcategorylist(result.data);
            setCat(id);
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
        if (result.status == 200) {
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
                                                            item.id == cat ?
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
                                        <label className="cols-sm-2 control-label">Sub-category</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">
                                                <select id="subcategoryid" className={"form-control" + subcatcheck} onChange={(e) => setSubcat(e.target.value)}>
                                                    <option defaultValue='0'>--Select--</option>
                                                    {
                                                        subcategorylist.map((item, index) =>
                                                            item.id == subcat ?
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
                                        <label className="cols-sm-2 control-label">Brand</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">
                                                <select id="brandid" className={"form-control" + brandcheck} onChange={(e) => setBrand(e.target.value)}>
                                                    <option defaultValue='0'>--Select--</option>
                                                    {
                                                        brandlist.map((item, index) =>
                                                            item.id == brand ?
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

                                                <input type="text" className={"form-control" + namecheck} name="name" id="name" placeholder="Enter your Name" required value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="cols-sm-2 control-label">Price</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">

                                                <input type="number" className={"form-control" + pricecheck} name="price" id="price" placeholder="Price" required value={price} onChange={(e) => setPrice(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="cols-sm-2 control-label">Description</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">

                                                <textarea className={"form-control" + descriptioncheck} name="description" id="description" placeholder="Description" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="cols-sm-2 control-label mt-2 mb-2">Photo <img src={"http://127.0.0.1:8000/products/" + productimgname} alt={name} style={{ width: "40px", height: "50px" }} /></label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">

                                                <input type="file" className="form-control" name="product_img" id="product_img" onChange={(e) => setProductimg(e.target.files[0])} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mt-3">
                                        <button type="button" onClick={UpdateProduct} style={{ width: "100%" }} className="btn btn-primary">Update Product</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default UpdateProduct;