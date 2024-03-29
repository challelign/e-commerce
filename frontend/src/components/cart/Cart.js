import React, {Fragment, useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";

import {addItemToCart,removeItemFromCart} from "../../actions/cartActions";
import {Link} from "react-router-dom";

const Cart = ({history}) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state.cart)

    const removeCartItemHandler = (id) =>{

        dispatch(removeItemFromCart(id));
    }

    const increaseQty = (id, quantity, stock) => {

        const newQty = quantity + 1
        if (newQty > stock) return;

        dispatch(addItemToCart(id, newQty))

    }
    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1
        if (newQty <= 0) return;

        dispatch(addItemToCart(id, newQty))
    }

    //when the user click checkout button and the user is not logged in it should be redirect to login?redirect=shipping page
    const checkoutHandler = () =>{
        history.push('/login?redirect=shipping')
    }

    return (
        <Fragment>
            <MetaData title={'Your Cart'}/>

            {cartItems.length === 0 ? <h2 className="mt-5"> Your cart is empty </h2> : (
                <Fragment>
                    <div className="container container-fluid">
                        <h2 className="mt-5">Your Cart: <b>{cartItems.length}</b></h2>

                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-lg-8">

                                {cartItems.map(item => (
                                    <Fragment>
                                        <hr/>
                                        <div className="cart-item" key={item.product}>
                                            <div className="row">
                                                <div className="col-4 col-lg-3">
                                                    <img src={item.image} alt="Laptop" height="90"
                                                         width="115"/>
                                                </div>

                                                <div className="col-5 col-lg-3">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p id="card_item_price">$ {item.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <div className="stockCounter d-inline">
                                                        <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}
                                                              readOnly>-</span>
                                                        <input type="number" className="form-control count d-inline"
                                                               value={item.quantity}/>

                                                        <span className="btn btn-primary plus"
                                                              value={item.quantity}
                                                              onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                                                    </div>
                                                </div>

                                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                    <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.product)}></i>
                                                </div>

                                            </div>
                                        </div>
                                        <hr/>
                                    </Fragment>
                                ))}

                                <hr/>
                            </div>

                            <div className="col-12 col-lg-3 my-4">
                                <div id="order_summary">
                                    <h4>Order Summary</h4>
                                    <hr/>
                                    <p>Subtotal: <span className="order-summary-values">{cartItems.reduce((acc , item) => (acc + Number(item.quantity)), 0)} (Units)</span></p>
                                    <p>Est. total: <span className="order-summary-values">$ {cartItems.reduce((acc , item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p>

                                    <hr/>
                                    <button id="checkout_btn" onClick={checkoutHandler} className="btn btn-primary btn-block">Check out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}

        </Fragment>
    )
}

export default Cart