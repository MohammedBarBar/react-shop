import React, { Component } from "react";
import axios from "axios";
import config from "../server/config.json";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";


function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class Admin extends Component {
  state = {
    AdminID: 0,
    selected: "",
    products: [],
    categories: [],
  };
  async componentDidMount() {
    const { data: admins } = await axios.get(config.AdminApi);
    this.setState({ AdminID: admins[0].idAdmin });
    // console.log(this.state.AdminID);
  }
  handleOpen = async (selected) => {
    if (selected === "1") {
      const { data: prods } = await axios.get(config.ProductApi);
      this.setState({ selected: "1" });
      this.setState({ products: shuffle(prods) });
      console.log(this.state.products);
    } else if (selected === "2") {
      const { data: cats } = await axios.get(config.CategoryApi);
      this.setState({ selected: "2" });
      this.setState({ categories: cats });
    }
  }

  handleLogOut = () =>{
        localStorage.setItem("admincheck",0);
        localStorage.setItem("AdminId",0);
        this.handleOpen("1");
  }
  deleteProd =async (id)=>{
    axios.delete(config.ProductApi + "?id=" + id);
    toast.success("Product Deleted Successfully");
    window.location.reload(false);
    // this.handleOpen("1");

  }
  deleteCat = async (id)=>{
    axios.delete(config.CategoryApi + "?id=" + id);
    toast.success("Category Deleted Successfully");
    window.location.reload(false);
    // this.handleOpen("2");
  }
  render() {
      let d = localStorage.getItem("AdminId");
      if(d === "0")
      return(
        <Redirect to={"/login"} />
      )

    if (this.props.match.params.id === this.state.AdminID) {
      if (this.state.selected === "1") {
        return (
            <div>
              <ToastContainer></ToastContainer>
            <button className="logout button3" onClick={this.handleLogOut}>
            Logout<span class="material-icons">logout</span>
          </button>
          <div className="grid-container">
            <div className="sideMenu">
              <ul>
                <li>
                  <button
                    className="button1"
                    onClick={() => {
                      this.handleOpen("1");
                    }}
                  >
                    {" "}
                    Show Products
                  </button>
                </li>
                <br></br>
                <li>
                  <button
                    className="button2"
                    onClick={() => {
                      this.handleOpen("2");
                    }}
                  >
                    {" "}
                    Show Categories
                  </button>
                </li>
              </ul>
            </div>
            <div className="MainContent">
             <NavLink to="/addProduct"><button className="button2">Add Product</button></NavLink>
              <table className="tablee">
                <thead>
                  <tr className="table-infoo">
                    <th>#</th>
                    <th>ProductName</th>
                    <th>Price</th>
                    <th>CategoryName</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.products.map((prod, index) => (
                    <tr className="table-infoo" key={index}>
                      <td>{index+1}</td>
                      <td>{prod.ProductsName}</td>
                      <td>{prod.price}</td>
                      <td>{prod.CategorName}</td>
                      <td>
                        <img
                          className="imgAdmin"
                          src={prod.Image}
                          alt={prod.Image}
                        ></img>
                      </td>

                      <td>
                        <input
                          className="button3"
                          type="button"
                          value="delete"
                          onClick={() => this.deleteProd(prod.idProducts)}
                        />&nbsp;
                            <NavLink className="upd" to={'/addProduct/' + prod.idProducts }><button className="button1">
                      Update
                      </button></NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </div>
        );
      } else if (this.state.selected === "2") {
        return (
<div>
<ToastContainer></ToastContainer>

            <button className="logout button3" onClick={this.handleLogOut}>
            Logout<span class="material-icons">logout</span>
          </button>
          <div className="grid-container">
            <div className="sideMenu">
              <ul>
                <li>
                  <button
                    className="button1"
                    onClick={() => {
                      this.handleOpen("1");
                    }}
                  >
                    {" "}
                    Show Products
                  </button>
                </li>
                <br></br>
                <li>
                  <button
                    className="button2"
                    onClick={() => {
                      this.handleOpen("2");
                    }}
                  >
                    {" "}
                    Show Categories
                  </button>
                </li>
              </ul>
            </div>
            <div className="MainContent">
             <NavLink to="/addCategory"><button className="button2">Add Product</button></NavLink>
              <table className="tablee">
                <thead>
                  <tr className="table-infoo">
                    <th>#</th>
                    <th>CategoryName</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.categories.map((cat, index) => (
                    <tr className="table-infoo" key={index}>
                      <td>{index+1}</td>
                      <td>{cat.categoriesName}</td>
                      {/* <td>{cat.price}</td> */}
                      <td>
                        <img
                          className="imgAdmin"
                          src={cat.catImage}
                          alt={cat.catImage}
                        ></img>
                      </td>

                      <td>
                        <input
                          className="button3"
                          type="button"
                          value="delete"
                          onClick={() => this.deleteCat(cat.idCategories)}
                        />&nbsp;
                        <NavLink className="upd" to={'/addCategory/' + cat.idCategories  }><button className="button1">
                      Update
                      </button></NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </div>
          
        );
      } else
        return (
            <div>
                            <ToastContainer></ToastContainer>

                  <button className="logout button3" onClick={this.handleLogOut}>
              Logout<span class="material-icons">logout</span>
            </button>
            
            <div className="grid-container">
            <div className="sideMenu">
              <ul>
                <li>
                  <button
                    className="button1"
                    onClick={() => {
                      this.handleOpen("1");
                    }}
                  >
                    {" "}
                    Show Products
                  </button>
                </li>
                <br></br>
                <li>
                  <button
                    className="button2"
                    onClick={() => {
                      this.handleOpen("2");
                    }}
                  >
                    {" "}
                    Show Categories
                  </button>
                </li>
              </ul>
            </div>
            <div className="MainContent">
                <h1>Here Admin Can See All Products And Categories in the Shop And Make Changes to them</h1>
                </div>
              {/* <button className="button2">Add Product</button>
              <table className="tablee">
                <thead>
                  <tr className="table-infoo">
                    <th>#</th>
                    <th>ProductName</th>
                    <th>Price</th>
                    <th>CategoryName</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.products.map((prod, index) => (
                    <tr className="table-infoo" key={index}>
                      <td>{index}</td>
                      <td>{prod.ProductsName}</td>
                      <td>{prod.price}</td>
                      <td>{prod.CategorName}</td>
                      <td>
                        <img
                          className="imgAdmin"
                          src={prod.Image}
                          alt={prod.Image}
                        ></img>
                      </td>

                      <td>
                        <input
                          className="button3"
                          type="button"
                          value="delete"
                          // onClick={() => this.deleteStu(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
            {/* </div> */}
          </div>
          </div>
        );
    } else return <h1>You Are Not allowed To acces This Page</h1>;
  }
}

export default Admin;
