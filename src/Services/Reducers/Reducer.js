import {
    ADMIN_LOGIN,
    PRODUCT_LIST,
    PRODUCT_UPDATE,
    ADD_PRODUCT,
    SEARCH_PRODUCT,
    ADD_BRAND,
    ADD_CATEGORY,
    ADD_SUB_CATEGORY
} from '../Constant'

export function REDUX_LOGIN_HANDLER(state = [], action) {
    switch (action.type) {
        case ADMIN_LOGIN:
            return [
                ...state,
                { RESPONSE: action.data }
            ]
            break;
        default:
            return [
                ...state
            ]
    }
}
export function REDUX_PRODUCT_LIST(state = [], action) {
    switch (action.type) {
        case PRODUCT_LIST:
            return [
                ...state,
                { RESPONSE: action.data }
            ]
            break;
        default:
            return [
                ...state
            ]
    }
}
export function REDUX_ADD_PRODUCT(state = [], action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return [
                ...state,
                { RESPONSE: action.data }
            ]
            break;
        default:
            return [
                ...state
            ]
    }
}
export function REDUX_PRODUCT_UPDATE(state = [], action) {
    switch (action.type) {
        case PRODUCT_UPDATE:
            return [
                ...state,
                { RESPONSE: action.data }
            ]
            break;
        default:
            return [
                ...state
            ]
    }
}

export function REDUX_SEARCH_PRODUCT(state = [], action) {
    switch (action.type) {
        case SEARCH_PRODUCT:
            return [
                ...state,
                { RESPONSE: action.data }
            ]
            break;
        default:
            return [
                ...state
            ]
    }
}

export function REDUX_ADD_BRAND(state = [], action) {
    switch (action.type) {
        case ADD_BRAND:
            return [
                ...state,
                { RESPONSE: action.data }
            ]
            break;
        default:
            return [
                ...state
            ]
    }
}

export function REDUX_ADD_CATEGORY(state = [], action) {
    switch (action.type) {
        case ADD_CATEGORY:
            return [
                ...state,
                { RESPONSE: action.data }
            ]
            break;
        default:
            return [
                ...state
            ]
    }
}

export function REDUX_ADD_SUB_CATEGORY(state = [], action) {
    switch (action.type) {
        case ADD_SUB_CATEGORY:
            return [
                ...state,
                { RESPONSE: action.data }
            ]
            break;
        default:
            return [
                ...state
            ]
    }
}


