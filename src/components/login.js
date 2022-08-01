import React, { Component } from "react";
import MyInput from "./MyInput";
import axios from "axios";
import config from "../server/config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";
// import routePage from "./routePage";
import { Redirect } from "react-router-dom";
// import Admin from "./Admin";
// import Admin from "./Admin";
// import { useHistory } from "react-router-dom";

class login extends Component {
  state = {
      admin:{
    idAdmin:"",
    Email: "",
    Password: "",
    FirstName:"",
    LastName:""
  },
  usr:{
    email:"",
    pass:""
  },
  errors: {
    emailError: "",
    PassError: "",
  },
  checked:0
};
  
handleChange=(evt)=>{
    
    const usr={ ...this.state.usr};
    usr[evt.target.id]=evt.target.value;
    this.setState({usr});
    // this.setState({isLodded:true})
    console.log(this.state.usr);
}
handleAdd=async ()=>{
    let data = this.state.admin[0];
    if(data.Email === this.state.usr.email && data.Password === this.state.usr.pass){
        // this.setState({checked:1});
        localStorage.setItem("admincheck",1);
        localStorage.setItem("AdminId",data.idAdmin);
        window.location.reload(false);
        // this.render();
      }
        else{
            toast.error("You are not Admin please enter correct Email & Password");

        }
    // console.log(this.state.admin.);
    //   axios.post(config.UserApi,this.state.usr);
    //   toast.success("New User Added Successfully");
  
  }
//   handleChange = (e) => {
//     this.setState({ [e.currentTarget.id]: e.currentTarget.value });
//   };

async componentDidMount() {
    const { data: admins } = await axios.get(config.AdminApi);
    this.setState({admin:admins});
    // console.log(this.state.usr);
}


  render() {
    // console.log(this.props);
    let data = localStorage.getItem("AdminId");
    let check = localStorage.getItem("admincheck");
// console.log(check);
    if(check === "1"){
        return(
        <Redirect to={"/admin/" + data} />
        )
       }
else{
    return (
      <div className="loginForm">
        <ToastContainer></ToastContainer>
        <MyInput
          name="email"
          type="text"
          placeholder="Enter your Email"
          error={this.state.errors.emailError}
          label="Email"
          onChange={this.handleChange}
        ></MyInput>

        <MyInput
          name="pass"
          type="password"
          placeholder="Enter your Password"
          error={this.state.errors.PassError}
          label="Password"
          onChange={this.handleChange}
        ></MyInput>

        <div className="form-group row">
          <div className="col-sm-10">
          <button className="btn btn-success" onClick={this.handleAdd} >Login</button>
          </div>
        </div>
      </div>
    );
  }}
}

export default login;
