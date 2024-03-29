import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productReducers, productDetailsReducer, newReviewReducer, newProductReducer, productReducer ,productReviewsReducer , reviewReducer} from "./reducers/productReducers";

import {authReducer, userReducer,forgetPasswordReducer,allUsersReducer,userDetailsReducer} from './reducers/userReducers'


import {cartReducer} from "./reducers/cartReducers";
import {newOrderReducer, myOrdersReducer, orderDetailsReducer ,allOrdersReducer,orderReducer} from "./reducers/orederReducers";

const reducer = combineReducers({

    products:productReducers,
    productDetails:productDetailsReducer,
    newProduct:newProductReducer,
    product:productReducer,


    auth :authReducer,
    user:userReducer,

    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    forgetPasswordRed: forgetPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrdersRed: myOrdersReducer,
    orderDetails:orderDetailsReducer,

    allOrders:allOrdersReducer,
    order:orderReducer,

    newReview:newReviewReducer,
    productReviews:productReviewsReducer,
    review:reviewReducer

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




































