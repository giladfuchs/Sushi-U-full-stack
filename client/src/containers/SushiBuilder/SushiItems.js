import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../../components/UI/Spinner/Spinner";
// import Modal from "../../components/UI/Modal/Modal";
// import Aux from "../../hoc/Aux/Aux";

import Item from "../../components/Sushi/Item/Item";

import axiosMessageHandler from "../../hoc/axiosMessageHandler/axiosMessageHandler";
import axios from "../../axios-api";
import * as actionType from "../../store/actions/index";
import itemsStyle from "./SushiItems.css";
import Aux from "../../hoc/Aux/Aux";
export class Items extends Component {
  state = {
    purchasing: false,
  };
  componentDidMount() {
    this.props.initItems();
  }
  addToCart = (itemId) => {
    this.props.addItemToCart(itemId, this.props.token);
  };
  render() {
    let items = this.props.error ? <p>cant load</p> : <Spinner />;

    if (this.props.items) {
      items = this.props.items.map((img) => (
        <Item
          key={img._id}
          itemId={img._id}
          price={img.price}
          title={img.title}
          image={img.imageUrl}
          content={img.content}
          btnDelete={this.props.deleteItem}
          btnAddToCart={this.addToCart}
        />
      ));
    }

    return (
      <Aux>
        {/* <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
      this is in process
        </Modal> */}
        <div className={itemsStyle.items}> {items} </div>;
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.sushiItems.items,
    error: state.sushiItems.error,
    isAuth: state.auth.token !== null,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initItems: () => dispatch(actionType.initItems()),
    deleteItem: (itemId) => dispatch(actionType.deleteItem(itemId)),
    addItemToCart: (itemId, token) =>
      dispatch(actionType.addItemToCart(itemId, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(axiosMessageHandler(Items, axios));
