import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../../../components/UI/Spinner/Spinner";
// import Modal from "../../components/UI/Modal/Modal";
// import Aux from "../../hoc/Aux/Aux";

import axiosMessageHandler from "../../../hoc/axiosMessageHandler/axiosMessageHandler";
import axios from "../../../axios-api";
import * as actionType from "../../../store/actions/index";

import Item from "../../Sushi/Item/Item";
import Sushi from "../../Sushi/Sushi";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

class CheckoutSummary extends Component {
  componentDidMount() {
    this.props.onInitCart();
  }
  state = {};
  render() {
    console.log(this.props.cart);

    let cart = this.props.error ? <p>cant load</p> : <Spinner />;
    let item = null;
    let sushi = null;
    if (this.props.cart) {
      if (this.props.cart.items.length > 0)
        item = this.props.cart.items.map((item) => (
          <Item
            key={item.product._id}
            itemId={item.product._id}
            price={item.product.price}
            title={item.product.title}
            image={item.product.imageUrl}
            content={item.content}
            btnDelete={this.props.deleteItem}
            btnAddToCart={this.addToCart}
          />
        ));
      if (this.props.cart.sushi.length > 0)
        sushi = this.props.cart.sushi.map((sushi) => <Sushi sushi={sushi} />);
      cart = !item && !sushi ? <p>cart is empty</p> : null;
    }

    return (
      <div className={classes.CheckoutSummary}>
        <h1> We hope it taste well </h1>
        {cart}
        <div style={{ width: "100%", margin: "auto" }}>{sushi}</div>
        <div>{item}</div>
        <Button btnType="Danger" clicked={this.props.checkoutCancelled}>
          {" "}
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.checkoutContinued}>
          {" "}
          CONTINUE
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.cart.error,

    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitCart: () => dispatch(actionType.fetchCart()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(axiosMessageHandler(CheckoutSummary, axios));
