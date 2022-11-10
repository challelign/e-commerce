import {useEffect, useState} from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import React from "react";

import Profile from "./components/user/Profile";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ProtectedRoute from "./components/route/ProtectedRoute";
import {loadUser} from "./actions/userActions";
import store from "./store";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword"
import ForgetPassword from "./components/user/ForgetPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";
//Payment

import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import Payment from "./components/cart/Payment";


function App() {


  const [stripeApiKey , setStripeApiKey] = useState('')

  useEffect(() =>{
    store.dispatch(loadUser())

    async function getStripApiKey() {
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey) // this call sendStripAPI method from paymentController
    }

    getStripApiKey()

  }, [])
  return (
    <div>
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="container container-fluid">
            <Route path="/" component={Home} exact />
            <Route path="/search/:keyword" component={Home} />
            <Route path="/product/:id" component={ProductDetails} exact />
            <Route path="/cart" component={Cart} exact />
            <ProtectedRoute path="/shipping" component={Shipping}  />
            <ProtectedRoute path="/order/confirm" component={ConfirmOrder}  />
              {stripeApiKey &&
              <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute path="/payment" component={Payment}/>
              </Elements>

              }


            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/me" component={Profile}  exact/>
            <ProtectedRoute path="/me/update" component={UpdateProfile}  exact/>
            <ProtectedRoute path="/password/update" component={UpdatePassword}  exact/>

            <Route path="/password/forget" component={ForgetPassword}  exact/>

            <Route path="/password/reset/:token" component={NewPassword}  exact/>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
