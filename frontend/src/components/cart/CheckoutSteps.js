import React, {Fragment, useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";

import {addItemToCart, removeItemFromCart} from "../../actions/cartActions";
import {Link} from "react-router-dom";

const CheckoutSteps = ({shipping, confirmOrder, payment}) => {
    return (
        <Fragment>
            <div className="checkout-progress d-flex justify-content-center mt-5">

                {shipping ? <Link to='shipping' className='float-right'>
                        <div className="triangle2-active"></div>
                        <div className="step active-step">Shipping</div>
                        <div className="triangle-active"></div>

                    </Link> :
                    <Link to="#!" disabled>
                        <div className="triangle2-incomplete"></div>
                        <div className="step incomplete">Shipping</div>
                        <div className="triangle-incomplete"></div>
                    </Link>
                }
                {confirmOrder ? <Link to='/order/confirm' className='float-right'>
                        <div className="triangle2-active"></div>
                        <div className="step active-step">Confirm Order</div>
                        <div className="triangle-active"></div>

                    </Link> :
                    <Link to="#!" disabled>
                        <div className="triangle2-incomplete"></div>
                        <div className="step incomplete">Confirm Order</div>
                        <div className="triangle-incomplete"></div>
                    </Link>
                }

                {payment ? <Link to='/payment' className='float-right'>
                        <div className="triangle2-active"></div>
                        <div className="step active-step">Payment</div>
                        <div className="triangle-active"></div>

                    </Link> :
                    <Link to="#!" disabled>
                        <div className="triangle2-incomplete"></div>
                        <div className="step incomplete">Payment</div>
                        <div className="triangle-incomplete"></div>
                    </Link>
                }
            </div>

        </Fragment>
    )
}


export default CheckoutSteps