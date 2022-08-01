import React, { Component } from "react";
import { connect } from "react-redux";
import "../index.css";
import {
  addToCart,
  addtoItems,
  addtoAddedItems,
  addTotalPrice,
} from "./actions/cartActions";
import axios from "axios";
import config from "../server/config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const testData = require("../data/data.json");

class Home extends Component {
  state = {
    prod: [],
    category: [],
    catName: {
      categoriesName: "",
      idCategories: "",
    },
    catSelected: [
      { id: "1", category: "Laptops" },
      { id: "2", category: "Mouse&Keybord" },
      { id: "3", category: "HEADSET" },
    ],
    isLoaded: true,
    id: 0,
  };

  async componentDidMount() {
    // let data = JSON.parse(localStorage.getItem('cardItem'));
    // console.log(data);
    // if(data.length === 0){
    let added = JSON.parse(localStorage.getItem("addedItems"));
    let price = JSON.parse(localStorage.getItem("totalPrice"));
    console.log(added);
    const { data: prods } = await axios.get(config.ProductApi);
    const { data: cat } = await axios.get(config.CategoryApi);
    this.setState({ category: cat });
    this.handelAdd(prods);
    this.handelAddedItems(added);
    this.handelTotalPrice(price);
    // localStorage.setItem("admincheck",0);
    // localStorage.setItem("AdminId",0);
    // this.setState({ prod: prods });
    // this.setState({ isLoaded: true });
    // // console.log(testData.length);
    // if (testData.length > 0)
    //   for (let index = 0; index < prods.length; index++) {
    //     Array.prototype.pop.apply(testData);
    //   }
    // // testData.push(prods);
    // Array.prototype.push.apply(testData, prods);
    // }
    // else{
    //   this.setState({ prod: data });
    //   this.setState({ isLoaded: true });
    //   if (testData.length > 0)
    //     for (let index = 0; index < data.length; index++) {
    //       Array.prototype.pop.apply(testData);
    //     }
    //   // testData.push(prods);
    //   Array.prototype.push.apply(testData, data);
    // }
  }

  async componentDidUpdate() {
    // localStorage.setItem('cardItem',JSON.stringify(this.props.items));
    localStorage.setItem("addedItems", JSON.stringify(this.props.addedITEMS));
    localStorage.setItem("totalPrice", JSON.stringify(this.props.totalPrice));
  }
  // console.log(testData);
  //    Object.assign({}, data);
  // var ar = data[0];
  // var arr = ar[0];
  // testData.push(arr);
  //    console.log(testData);
  //    console.log(data);

  // console.log(this.state.prod);
  // const {data:cat} = await axios.get(config.CategoryApi);
  // this.setState({category:cat});
  // // this.setState({ isLoaded: true });
  // for (let index = 0; index < this.state.prod.length; index++) {
  //     let itemName = this.state.category.find(item=> this.state.prod[index].CategoryId === item.idCategories );
  //     // categoriesName
  //     this.setState({catName:itemName});
  //     this.state.prod[index].CategoryId = this.state.catName.categoriesName;
  //     console.log(this.state.prod[index]);

  // }
  // console.log(this.state.category);
  // }

  //   async componentDidUpdate(prevProps) {
  //     if (prevProps.match.params.id !== this.props.match.params.id) {
  //       const { data: prods } = await axios.get(
  //         config.prod + "?id=" + this.props.match.params.id
  //       );
  //       this.setState({ prod: prods });

  //       this.setState({ isLoaded: true });
  //     }
  //   }

  handleClick = (id) => {
    this.props.addToCart(id);
    let namep = this.props.items.find((item) => item.idProducts === id);
    toast.success(namep.ProductsName + " Added Successfully to the card");
  };
  handelAdd = (data) => {
    this.props.addtoItems(data);
  };
  handelTotalPrice = (data) => {
    this.props.addTotalPrice(data);
  };
  handelAddedItems = (data) => {
    this.props.addtoAddedItems(data);
  };
  // getCategoryName =(id)=>{
  //     //   console.log(id);
  //       this.state.catName = id;
  //     //   console.log(this.state.catName);
  //    let itemName =  this.state.category.find(Catname=> Catname.idCategories === id);
  //     this.state.catName = itemName;
  //    console.log(this.state.catName);
  // //    return "dasd";
  //   }

  render() {
    // console.log(this.props);
    // let data = JSON.parse(localStorage.getItem('cardAdded'));
    //     console.log(data);categoriesName
    console.log(this.props.addedITEMS);
    if (this.props.match.params.id) {
      let selected = this.state.category.find(
        (item) => item.idCategories === this.props.match.params.id
      );
      console.log(selected);
      if (selected) {
        let prod = this.props.items.filter(
          (item) => selected.categoriesName === item.CategorName
        );
        let itemList = prod.map((item) => {
          return (
            <div className="card" key={item.idProducts}>
              {/* <ToastContainer></ToastContainer> */}
              <div className="card-image">
                <img src={item.Image} alt={item.ProductsName} />
                {/* <span className="card-title">{item.ProductsName}</span> */}
                <span
                  to="/"
                  className="btn-floating halfway-fab waves-effect waves-light blue"
                  onClick={() => {
                    this.handleClick(item.idProducts);
                  }}
                >
                  <i className="material-icons">add</i>
                </span>
              </div>
              <span className="card-title">{item.ProductsName}</span>
              <div className="card-content">
                <p>Category: {item.CategorName}</p>
                <p>
                  <b>Price: {item.price}$</b>
                </p>
              </div>
            </div>
          );
        });
        return (
          <div className="container">
            <ToastContainer autoClose={1500}></ToastContainer>
            {/* <h3 className="center">Our items</h3> */}
            <div className="box">{itemList}</div>
          </div>
        );
      } else {
        let itemList = "";
        return (
          <div className="container">
            <ToastContainer autoClose={1500}></ToastContainer>
            {/* <h3 className="center">Our items</h3> */}
            <div className="box">{itemList}</div>
          </div>
        );
      }
    } else {
      let itemList = this.props.items.length
        ? this.props.items.map((item) => {
            return (
              <div className="card" key={item.idProducts}>
                {/* <ToastContainer autoClose={1000}></ToastContainer> */}
                <div className="card-image">
                  <img src={item.Image} alt={item.ProductsName} />
                  {/* <span className="card-title">{item.ProductsName}</span> */}
                  <span
                    to="/"
                    className="btn-floating halfway-fab waves-effect waves-light blue"
                    onClick={() => {
                      this.handleClick(item.idProducts);
                    }}
                  >
                    <i className="material-icons">add</i>
                  </span>
                </div>
                <span className="card-title">{item.ProductsName}</span>
                <div className="card-content">
                  <p>Category: {item.CategorName}</p>
                  <p>
                    <b>Price: {item.price}$</b>
                  </p>
                </div>
              </div>
            );
          })
        : console.log("a");
      // console.log(itemList);
      return (
        <div className="container">
          <ToastContainer autoClose={1500}></ToastContainer>
          {/* <h3 className="center">Our Products</h3> */}
          <div className="box">{itemList}</div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    items: state.items,
    addedITEMS: state.addedItems,
    totalPrice: state.total,
    //   state.items
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
    addtoItems: (data) => {
      dispatch(addtoItems(data));
    },
    addtoAddedItems: (data) => {
      dispatch(addtoAddedItems(data));
    },
    addTotalPrice: (data) => {
      dispatch(addTotalPrice(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
