import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../index.css";
import {
  removeItem,
  addQuantity,
  subtractQuantity,
  addtoAddedItems,
} from "./actions/cartActions";
import Order from "./order";

class Cart extends Component {
  cardItem;

  state = {
    items: [],
  };

  //to remove the item completely
  handleRemove = (id) => {
    console.log(this.props);
    this.props.removeItem(id);
    // this.setState({items:this.props.items})
  };
  //to add the quantity
  handleAddQuantity = (id) => {
    this.props.addQuantity(id);
  };
  //to substruct from the quantity
  handleSubtractQuantity = (id) => {
    this.props.subtractQuantity(id);
  };
  handelAddedItems = (data) => {
    this.props.addtoAddedItems(data);
  };
  // setData=()=>{
  //     this.setState({items:this.props.items});
  // }
  // getData(){
  //     return localStorage.getItem('cardItem');
  //     // console.log(data);
  // }

  async componentDidMount() {
    // localStorage.setItem("admincheck",0);
    // localStorage.setItem("AdminId",0);
    let data = JSON.parse(localStorage.getItem("addedItems"));
    this.handelAddedItems(data);
    console.log(data);
    // let pp = JSON.parse(localStorage.getItem('totalPrice'));

    // console.log(pp);
    // console.log(this.props.totalPrice);
  }

  // async componentDidUpdate(){
  //     this.componentDidMount();
  //     let data = JSON.parse(localStorage.getItem('card'));
  //      console.log(data.length);
  //     if(data.length === 0){
  //                 console.log("2");

  //         // this.setState({ items: this.props.items });
  //   }
  //   else{
  //     //    this.props.items = data;
  //     console.log(data);
  //   }
  //     // console.log("1");
  //     // localStorage.setItem('card',JSON.stringify(this.props.items));
  //   }

  async componentDidUpdate() {
    localStorage.setItem("addedItems", JSON.stringify(this.props.items));
    localStorage.setItem("totalPrice", JSON.stringify(this.props.totalPrice));

    console.log(this.props);
  }

  render() {
    console.log(this.props.items);
    let addedItems = this.props.items.length ? (
      this.props.items.map((item) => {
        // let addedItems = data.length ?
        // (
        //     data.map(item=>{
        return (
          <li className="collection-item avatar" key={item.idProducts}>
            <div className="item-img">
              <img src={item.Image} alt={item.Image} />
            </div>

            <div className="item-desc">
              <span className="title">{item.ProductsName}</span>
              <p>{item.CategorName}</p>
              <p>
                <b>Price: {item.price * item.quantity}$</b>
              </p>
              <p>
                <b>Quantity: {item.quantity}</b>
              </p>
              <div className="add-remove">
                <Link to="/cart">
                  <i
                    className="material-icons"
                    onClick={() => {
                      this.handleAddQuantity(item.idProducts);
                    }}
                  >
                    arrow_drop_up
                  </i>
                </Link>
                <Link to="/cart">
                  <i
                    className="material-icons"
                    onClick={() => {
                      this.handleSubtractQuantity(item.idProducts);
                    }}
                  >
                    arrow_drop_down
                  </i>
                </Link>
              </div>
              <button
                className="waves-effect waves-light btn pink remove"
                onClick={() => {
                  this.handleRemove(item.idProducts);
                }}
              >
                Remove
              </button>
            </div>
          </li>
        );
      })
    ) : (
      <p>Nothing Found.</p>
    );
    return (
      <div className="container">
        <div className="cart">
          <h5>You have ordered:</h5>
          <ul className="collection">{addedItems}</ul>
        </div>
        <Order></Order>
        {/* {console.log(this.state.items)} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.addedItems);
  return {
    items: state.addedItems,
    totalPrice: state.total,
    // items: JSON.parse(localStorage.getItem('cc'))
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => {
      dispatch(removeItem(id));
    },
    addQuantity: (id) => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: (id) => {
      dispatch(subtractQuantity(id));
    },
    addtoAddedItems: (data) => {
      dispatch(addtoAddedItems(data));
    },
    // setData: () =>{dispatch(setData())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
