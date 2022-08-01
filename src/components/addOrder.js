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

class addOrder extends Component {
  state = {
    stu: [],
    errors: {
      userNameError: "",
      emailError: "",
      TelError: "",
      PassError: "",
    },
    usr: {
      Email: "",
      Fname: "",
      Lname: "",
      city:"",
      street:"",
      password:"",
      idUser:"",
      Creadit:""
    },
    addedItems:[],
    item:{
      quantity:"",
      Tprice:"",
      prodId:"",
      cartId:""
    },
    order:{
      quantity:"",
      price:"",
      city:"",
      street:"",
      creadit:""
    },
    isLodded : false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.props.history);
    // this.state.stu = getStudent();
    // console.log({e});
  };

  handleChange=(evt)=>{
    
    const usr={ ...this.state.usr};
    usr[evt.target.id]=evt.target.value;
    this.setState({usr});
    this.setState({isLodded:true})
    console.log(this.state.usr);
}
handleAdd=async ()=>{
  console.log(this.state.usr.idUser);
  // console.log(this.state.usr);
  if(this.state.usr.idUser){
    console.log(this.state.usr);
    axios.post(config.UserApi,this.state.usr);
    toast.success("New User Added Successfully");

  }
  //// cardItems Post
  if(this.state.addedItems.length>0){
    for (let index = 0; index < this.state.addedItems.length; index++) {
      this.state.item.quantity = this.state.addedItems[index].quantity;
      this.state.item.Tprice = this.state.addedItems[index].price;
      this.state.item.prodId = this.state.addedItems[index].idProducts;
      this.state.item.cartId = this.state.usr.idUser;
      // console.log(this.state.item);
      axios.post(config.CartItemsApi,this.state.item);
      toast.success("New Items Added Successfully");

    }}
    ///// order post
    if(this.state.usr.idUser && this.state.addedItems>0){
      let price=0;
      let qun =0;
    for (let index = 0; index < this.state.addedItems.length; index++) {
      qun += this.state.addedItems[index].quantity;
      price += this.state.addedItems[index].price;
    }
    
    this.state.order.quantity = qun.toString();
    this.state.order.price = price.toString();
    this.state.order.city = this.state.usr.city;
    this.state.order.street = this.state.usr.street;
    this.state.order.creadit = this.state.usr.Creadit;
    console.log(this.state.order);
    axios.post(config.OrderApi,this.state.order);
    toast.success("New Order Added Successfully");


  }
    // console.log(this.state.order);
    // const { data: prods } = await axios.get(config.ProductApi);
// window.location.replace('/home');

}
async componentDidMount() {
  let data = JSON.parse(localStorage.getItem('OrderItems'));
  this.setState({addedItems:data});
  let data1 = JSON.parse(localStorage.getItem('totalPrice'));

  console.log(data);
  console.log(data1);
  // console.log(data);
  // console.log(this.ps);
  // const { data: UpdateUser } = await axios.get(config.serverApi +"?id=" + this.props.match.params.id);
  // this.setState({ UpdateUser});
  // this.setState({isLodded:true})
  // console.log(this.state.UpdateUser);
  // this.setState({ isLoaded: true });
}
// handelUpdateServe = () => {
//   axios.put(config.serverApi + "?id=" + this.props.match.params.id,this.state.UpdateUser);
//   toast.success("Updated Successfully");

// }
  render() {
   
    return (
      
      <form className="OrderForm" onSubmit={this.handleSubmit}>
        <ToastContainer></ToastContainer>
        <MyInput
          name="idUser"
          type="text"
          placeholder="Enter your ID Number(9 Digits)"
          error={this.state.errors.userNameError}
          label="ID#"
          onChange={this.handleChange}
        ></MyInput>

        <MyInput
          name="Fname"
          type="text"
          placeholder="Enter Your First Name"
          error={this.state.errors.userNameError}
          label="First Name"
          onChange={this.handleChange}
        ></MyInput>

        <MyInput
          name="Lname"
          type="text"
          placeholder="Enter your Last Name"
          error={this.state.errors.emailError}
          label="Last Name"
          onChange={this.handleChange}
        ></MyInput>

        {/* <MyInput
          name="password"
          type="password"
          placeholder="Enter your Password"
          error={this.state.errors.emailError}
          label="Password"
          onChange={this.handleChange}
        ></MyInput> */}

        <MyInput
          name="Email"
          type="text"
          placeholder="Enter Your Email"
          error={this.state.errors.PassError}
          label="Email"
          onChange={this.handleChange}
        ></MyInput>

        <MyInput
          name="password"
          type="text"
          placeholder="Enter Your Telephone"
          error={this.state.errors.TelError}
          label="Telephone"
          onChange={this.handleChange}
        ></MyInput>

          <MyInput
          name="city"
          type="text"
          placeholder="Enter Your City"
          error={this.state.errors.TelError}
          label="City"
          onChange={this.handleChange}
        ></MyInput>

          <MyInput
          name="street"
          type="text"
          placeholder="Enter Your Street"
          error={this.state.errors.TelError}
          label="Street"
          onChange={this.handleChange}
        ></MyInput>

        <MyInput
          name="Creadit"
          type="text"
          placeholder="Enter Last 4 digits of your Creadit Card"
          error={this.state.errors.TelError}
          label="Creadit Card"
          onChange={this.handleChange}
        ></MyInput>

        <h6><span>** Note: The order Dileverd after 2 weeks from Now</span></h6>

        <div className="form-group row">
          <div className="col-sm-10">
          <button className="btn btn-success" onClick={this.handleAdd} >Order</button>
          </div>
        </div>
      </form>
    );
  }
}

// const mapStateToProps = (state)=>{
//   // console.log(state);
//   return{
//       addedItems: state.addedItems,
//       total: state.total
//   }
// }

// const mapDispatchToProps = (dispatch)=>{
//   return{
    
//   }
// }
export default addOrder
// connect(mapStateToProps,mapDispatchToProps)