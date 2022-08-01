import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
// import addOrder from './addOrder';

import { addTotalPrice } from "./actions/cartActions";
class order extends Component {
  constructor() {
    super();
    this.shipping = createRef();
  }
  state = {
    selected: false,
  };
  componentWillUnmount() {
    if (this.shipping.checked) this.props.substractShipping();
  }

  handleChecked = (e) => {
    if (e.target.checked) {
      this.props.addShipping();
      console.log(this.props.total);
    } else {
      this.props.substractShipping();
      console.log(this.props.total);
    }
  };
  orderItems = () => {
    this.setState({ selected: true });
  };
  handelTotalPrice(data) {
    this.props.addTotalPrice(data);
  }
  async componentDidMount() {
    localStorage.setItem("OrderItems", JSON.stringify(this.props.addedItems));
    let data = JSON.parse(localStorage.getItem("totalPrice"));
    this.handelTotalPrice(data);
    // console.log(data);

    // localStorage.setItem("totalPrice",JSON.stringify(this.props.total));
  }
  async componentDidUpdate() {
    // localStorage.setItem("priceTotal", JSON.stringify(this.props.total));
    // localStorage.setItem("priceTotal", 0);
  }

  render() {
    // console.log(this.props.addedItems);
    return (
      <div className="container">
        <div className="collection">
          <li className="collection-item">
            <label>
              <input
                type="checkbox"
                ref={this.shipping}
                onChange={this.handleChecked}
              />
              <span>Shipping(+10$)</span>
            </label>
          </li>
          <li className="collection-item">
            <b>Total: {this.props.total} $</b>
            {/* {console.log(this.props)} */}
          </li>
        </div>
        <div className="checkout">
          {/* {console.log()} */}
          {this.props.addedItems.length ? (
            <NavLink to="/addOrder">
              <button className="waves-effect waves-light btn">Checkout</button>
            </NavLink>
          ) : (
            <NavLink to="/">
              <button className="waves-effect waves-light btn">Checkout</button>
            </NavLink>
          )}
          {/* <NavLink to="/addOrder"><button className="waves-effect waves-light btn">Checkout</button></NavLink> */}
          {/* <button className="waves-effect waves-light btn" onClick={this.orderItems}>Checkout</button> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    addedItems: state.addedItems,
    total: state.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addShipping: () => {
      dispatch({ type: "ADD_SHIPPING" });
    },
    substractShipping: () => {
      dispatch({ type: "SUB_SHIPPING" });
    },
    addTotalPrice: (data) => {
      dispatch(addTotalPrice(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(order);
