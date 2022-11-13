import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productReducers ,productDetailsReducer} from "./reducers/productReducers";

import {authReducer, userReducer,forgetPasswordReducer} from './reducers/userReducers'


import {cartReducer} from "./reducers/cartReducers";
import {newOrderReducer} from "./reducers/orederReducers";

const reducer = combineReducers({

    products:productReducers,
    productDetails:productDetailsReducer,
    auth :authReducer,
    user:userReducer,
    forgetPasswordRed: forgetPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer
})


let initialState = {

    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    }
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store




































