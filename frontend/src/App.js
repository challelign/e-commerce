import {BrowserRouter, Route, } from 'react-router-dom'
import './App.css';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails"
import React from "react";

import Login from   './components/user/Login'
function App() {
  return (
      <div>
          <BrowserRouter>

              <div className="App">
                  <Header/>
                  <div className="container container-fluid"> 
                      <Route path="/" component={Home} exact />
                      <Route path="/search/:keyword" component={Home} />
                      <Route path="/product/:id" component={ProductDetails} exact />


                      <Route path="/login" component={Login}   />
                  </div>
                  <Footer/>
              </div>
              
          </BrowserRouter>
      </div>

  );
}

export default App;
