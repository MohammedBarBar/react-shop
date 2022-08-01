// import logo from './logo.svg';
// import './App.css';
import Nav from "./components/Navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import NotFound from "./components/NotFound";
// import React, { Component } from 'react';
import React from "react";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Category from "./components/category";
import Main from "./components/Main";
import addOrder from "./components/addOrder";
import login from "./components/login";
import Admin from "./components/Admin";
import addProduct from "./components/addProduct";
import addCategory from "./components/addCategory";
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="App">
          <Nav></Nav>
          <Category></Category>
          <Switch>
            <Route path="/Main" component={Main}></Route>
            <Route path="/login" component={login}></Route>
            <Route path="/addCategory/:id" component={addCategory}></Route>
            <Route path="/addCategory" component={addCategory}></Route>
            <Route path="/addProduct/:id" component={addProduct}></Route>
            <Route path="/addProduct" component={addProduct}></Route>
            <Route path="/admin/:id" component={Admin}></Route>
            <Route path="/react-shop/:id" component={Home} />
            <Route path="/react-shop" component={Home} />
            <Route path="/addOrder" component={addOrder} />
            <Route path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/react-shop" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
