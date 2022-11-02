import {useEffect} from 'react'
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
function App() {
  useEffect(() =>{
    store.dispatch(loadUser())
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
