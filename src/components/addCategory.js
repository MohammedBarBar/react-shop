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

class addCategory extends Component {
  state = {
    prod: [],
    errors: {
      ProNameError: "",
      PricelError: "",

    },
    categoryee: {
      cName:"",
      Image:""
    },
    category:[],
    isLodded : false,
    selectValue:"",
    UpdateCat:{
        idCategories :"",
        categoriesName:"",
        catImage:""
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.props.history);
    // this.state.stu = getStudent();
    // console.log({e});
  };

  handleChange=(evt)=>{
    
    const categoryee={ ...this.state.categoryee};
    categoryee[evt.target.id]=evt.target.value;
    this.setState({categoryee});
    this.setState({isLodded:true})
    
    // console.log(this.state.product);
}
handleAdd=async ()=>{
  console.log(this.state.categoryee);
    axios.post(config.CategoryApi,this.state.categoryee);
    toast.success("Product Added Successfully");

}

handleUpdate=async ()=>{
    console.log(this.state.categoryee);
      axios.put(config.CategoryApi + "?id=" + this.props.match.params.id,this.state.categoryee);
      toast.success("Product Updated Successfully");
  
  }
async componentDidMount() {
    const { data: categories } = await axios.get(config.CategoryApi);
    this.setState({category:categories});
    let upd = this.state.category.find(item=> item.idCategories === this.props.match.params.id);
    this.setState({UpdateCat:upd});

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
            name="cName"
            type="text"
            placeholder={this.state.UpdateCat.categoriesName}
            error={this.state.errors.ProNameError}
            label="Product Name"
            onChange={this.handleChange}
          ></MyInput>
  
          <MyInput
            name="Image"
            type="text"
            placeholder={this.state.UpdateCat.catImage}
            error={this.state.errors.PricelError}
            label="Price"
            onChange={this.handleChange}
          ></MyInput>
  
          
    <br></br>
  
          <div className="form-group row">
            <div className="col-sm-10">
            <button className="btn btn-success" onClick={this.handleUpdate} >Update Category</button>
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
          name="cName"
          type="text"
          placeholder="Enter Category Name"
          error={this.state.errors.ProNameError}
          label="Categor Name"
          onChange={this.handleChange}
        ></MyInput>

        <MyInput
          name="Image"
          type="text"
          placeholder="Enter URL Image"
          error={this.state.errors.PricelError}
          label="Image"
          onChange={this.handleChange}
        ></MyInput>

        
  <br></br>

        <div className="form-group row">
          <div className="col-sm-10">
          <button className="btn btn-success" onClick={this.handleAdd} >Add Category</button>
          </div>
        </div>
      </form>
    );
}
  }
}


export default addCategory
// connect(mapStateToProps,mapDispatchToProps)