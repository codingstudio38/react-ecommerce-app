export const ADMIN_LOGIN = "ADMIN_LOGIN";
export const PRODUCT_LIST = "PRODUCT_LIST";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const PRODUCT_UPDATE = "PRODUCT_UPDATE";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_SUB_CATEGORY = "ADD_SUB_CATEGORY";
export const ADD_BRAND = "ADD_BRAND";
export const API_URL = "http://127.0.0.1:8000/api";
export const LOGOUT_URL = "http://localhost:3000/";
export const ADMIN_DETAILS = () => {
    if (!window.localStorage.getItem("user_info")) {
        return false;
    } else {
        return JSON.parse(window.localStorage.getItem("user_info"));

    }
}


