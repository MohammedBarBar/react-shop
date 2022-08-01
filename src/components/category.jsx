import React, { Component } from "react";
import axios from "axios";
import config from "../server/config.json";
import { Link } from "react-router-dom";
import "../index.css";

class categor extends Component {
  state = {
    category: [],
    isLoaded: true,
  };
  async componentDidMount() {
    const { data: categories } = await axios.get(config.CategoryApi);
    this.setState({ category: categories });
    this.setState({ isLoaded: true });
    // localStorage.setItem("admincheck",0);
    // localStorage.setItem("AdminId",0);
  }

  render() {
    return (
      <nav className="nav-wrapper navbar navbar-scroll">
        <div className="container">
          <ul className="center">
            <Link to="/home" className="catItems">
              <li>Home</li>
            </Link>
            {/* <div>Categories Available :  */}
            {this.state.isLoaded &&
              this.state.category.map((cat, index) => (
                <Link to={"/home/" + (index + 1)} className="catItems">
                  <li>{cat.categoriesName}</li>
                </Link>
              ))}
              <li><Link className="AdminPannel" to="/login"><span className="material-icons AdminPannel">admin_panel_settings</span>Admin</Link></li>
          </ul>
        </div>
        
      </nav>
    );
  }
}

export default categor;
