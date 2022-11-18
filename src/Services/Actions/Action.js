import {
    ADMIN_LOGIN,
    PRODUCT_LIST,
    PRODUCT_UPDATE,
    ADD_PRODUCT,
    SEARCH_PRODUCT,
    ADD_BRAND,
    ADD_CATEGORY,
    ADD_SUB_CATEGORY
} from '../Constant';
import axios from 'axios';
import { API_URL } from '../Constant';
export const adminLogin = (postdata) => (dispatch) => {
    fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(postdata)
    })
        .then((response) => response.json())
        .then((data) => {
            return dispatch({
                data: data,
                type: ADMIN_LOGIN
            })
        })
        .catch((error) => { console.log(error); });
}
export const productListF = (getdata) => (dispatch) => {
    fetch(`${API_URL}/access/productlist?page=${getdata.page}&limit=${getdata.size}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .then((data) => {
            return dispatch({
                data: data,
                type: PRODUCT_LIST
            })
        })
        .catch((error) => { console.log(error); });
}
export const getProductDetail = (getdata) => (dispatch) => {
    fetch(`${API_URL}/access/productdetail/${getdata.id}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .then((data) => {
            return dispatch({
                data: data,
                type: PRODUCT_UPDATE
            })
        })
        .catch((error) => { console.log(error); });
}
export const addProduct = (postdata) => (dispatch) => {
    axios({
        method: "POST",
        url: `${API_URL}/access/addproduct`,
        data: postdata,
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(function (response) {
        return dispatch({
            data: response,
            type: ADD_PRODUCT
        })
    }).catch(function (response) {
        console.error(response);
    });
}
export const searchProductlist = (getdata) => (dispatch) => {
    fetch(`${API_URL}/access/searchproduct?keywork=${getdata.keyword}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .then((data) => {
            return dispatch({
                data: data,
                type: SEARCH_PRODUCT
            })
        })
        .catch((error) => { console.log(error); });
}

export const addbrandlist = (getdata) => (dispatch) => {
    axios({
        method: "POST",
        url: `${API_URL}/access/addbrand`,
        data: getdata,
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(function (response) {
        return dispatch({
            data: response,
            type: ADD_BRAND
        })
    }).catch(function (response) {
        console.error(response);
    });
}

export const addcategorylist = (getdata) => (dispatch) => {
    axios({
        method: "POST",
        url: `${API_URL}/access/addcategory`,
        data: getdata,
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(function (response) {
        return dispatch({
            data: response,
            type: ADD_CATEGORY
        })
    }).catch(function (response) {
        console.error(response);
    });
}

export const addsubcategorylist = (getdata) => (dispatch) => {
    axios({
        method: "POST",
        url: `${API_URL}/access/addsubcategory`,
        data: getdata,
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(function (response) {
        return dispatch({
            data: response,
            type: ADD_SUB_CATEGORY
        })
    }).catch(function (response) {
        console.error(response);
    });
}


