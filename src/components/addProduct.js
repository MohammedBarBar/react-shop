import React, { Component } from "react";
import MyInput from "./MyInput";
import axios from "axios";
import config from "../server/config.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { NavLink } from "react-router-dom";
import "../index.css";
// import { connect } from 'react-redux';


// import {getStudent} from './Student';

class addProduct extends Component {
  state = {
    prod: [],
    errors: {
      ProNameError: "",
      PricelError: "",
      ImgError: "",
      CatError: "",
    },
    product: {
        ProName: "",
        price: "",
        image: "",
        catName:"",
    },
    category:[],
    isLodded : false,
    selectValue:"",
    UpdateProduct:{
        idProducts:"",
        ProductsName:"",
        price:"",
        Image:"",
        CategoryId:"",
        CategorName:""
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.props.history);
    // this.state.stu = getStudent();
    // console.log({e});
  };

  handleChange=(evt)=>{
    
    const product={ ...this.state.product};
    product[evt.target.id]=evt.target.value;
    this.setState({product});
    this.setState({isLodded:true})
    
    // console.log(this.state.product);
}
handleAdd=async ()=>{
  console.log(this.state.product);
    axios.post(config.ProductApi,this.state.product);
    toast.success("Product Added Successfully");

}

handleUpdate=async ()=>{
    console.log(this.state.product);
      axios.put(config.ProductApi + "?id=" + this.props.match.params.id,this.state.product);
      toast.success("Product Updated Successfully");
  
  }
async componentDidMount() {
    const { data: categories } = await axios.get(config.CategoryApi);
    this.setState({category:categories});
    const { data: prods } = await axios.get(config.ProductApi);
    this.setState({prod:prods});
    let upd = this.state.prod.find(item=> item.idProducts === this.props.match.params.id);
    this.setState({UpdateProduct:upd});

}
componentDidUpdate(){
    // var select2 = document.querySelectorAll('select');
    // var instances = M.FormSelect.init(select2);
// console.log("select2");
}
// handelUpdateServe = () => {
//   axios.put(config.serverApi + "?id=" + this.props.match.params.id,this.state.UpdateUser);
//   toast.success("Updated Successfully");

// }
  render() {
if(this.props.match.params.id){
    return (
      
        <form className="OrderForm" onSubmit={this.handleSubmit}>
          <ToastContainer></ToastContainer>
          <MyInput
            name="ProName"
            type="text"
            placeholder={this.state.UpdateProduct.ProductsName}
            error={this.state.errors.ProNameError}
            label="Product Name"
            onChange={this.handleChange}
          ></MyInput>
  
          <MyInput
            name="price"
            type="text"
            placeholder={this.state.UpdateProduct.price}
            error={this.state.errors.PricelError}
            label="Price"
            onChange={this.handleChange}
          ></MyInput>
  
          <MyInput
            name="image"
            type="text"
            placeholder={this.state.UpdateProduct.Image}
            // value={this.state.UpdateProduct.Image}
            error={this.state.errors.ImgError}
            label="Image"
            onChange={this.handleChange}
          ></MyInput>
          <label>Categoy Select</label>
    <select id="catName" class="browser-default" onChange={this.handleChange}>
      <option value="" disabled selected>{this.state.UpdateProduct.CategorName}</option>
      {this.state.category.map((cat)=>(
              <option value={cat.categoriesName}>{cat.categoriesName}</option>
  
      ))}
    </select>
    <br></br>
  
          <div className="form-group row">
            <div className="col-sm-10">
            <button className="btn btn-success" onClick={this.handleUpdate} >Update Product</button>
            </div>
          </div>
        </form>
      );
}
   else{
    return (
      
      <form className="OrderForm" onSubmit={this.handleSubmit}>
        <ToastContainer></ToastContainer>
        <MyInput
          name="ProName"
          type="text"
          placeholder="Enter Product Name"
          error={this.state.errors.ProNameError}
          label="Product Name"
          onChange={this.handleChange}
        ></MyInput>

        <MyInput
          name="price"
          type="text"
          placeholder="Enter Product Price"
          error={this.state.errors.PricelError}
          label="Price"
          onChange={this.handleChange}
        ></MyInput>

        <MyInput
          name="image"
          type="text"
          placeholder="Enter URL of Image"
          error={this.state.errors.ImgError}
          label="Image"
          onChange={this.handleChange}
        ></MyInput>
        <label>Categoy Select</label>
  <select id="catName" class="browser-default" onChange={this.handleChange}>
    <option value="" disabled selected>Choose your option</option>
    {this.state.category.map((cat)=>(
            <option value={cat.categoriesName}>{cat.categoriesName}</option>

    ))}
  </select>
  <br></br>

        <div className="form-group row">
          <div className="col-sm-10">
          <button className="btn btn-success" onClick={this.handleAdd} >ADD Product</button>
          </div>
        </div>
      </form>
    );
}
  }
}


export default addProduct
// connect(mapStateToProps,mapDispatchToProps)