import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios-api";

import Spinner from "../../components/UI/Spinner/Spinner";
import axiosMessageHandler from "../../hoc/axiosMessageHandler/axiosMessageHandler";
import * as actions from "../../store/actions/index";

class Orders extends Component {
  componentWillMount() {
    this.props.onFetchOrder();
  }
  render() {


    const show = this.props.loading ? (
      <Spinner />
    ) : (
        Object.keys(this.props.data).map((order) => {
          return (
            <div key={order}>
              <p> {"Date "}{this.props.data[order].createdAt.split('T')[0]}{" methood "}
                {this.props.data[order].orderData.orderMethod}{" builder "}
                {this.props.data[order].cart.sushi.length}{" items "}
                {this.props.data[order].cart.items.length}{" price "}
                {this.props.data[order].cart.price}{" "}

              </p>
            </div>
          );
        })
      );

    return <div>{show}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,

  };
};

const mapDipatchToProps = (dispatch) => {
  return {
    onFetchOrder: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(axiosMessageHandler(Orders, axios));
