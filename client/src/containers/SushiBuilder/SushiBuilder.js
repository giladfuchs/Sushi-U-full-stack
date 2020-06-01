import React, { Component } from "react";
import { connect } from "react-redux";

import BuildrControls from "../../components/Sushi/BuildControls/BuildControls";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";

import OrderSummary from "../../components/Sushi/OrderSummary/OrderSummary";
import axiosMessageHandler from "../../hoc/axiosMessageHandler/axiosMessageHandler";
import axios from "../../axios-api";
import * as actionType from "../../store/actions/index";
import Sushi from "../../components/Sushi/Sushi";

export class SushiBuilder extends Component {
  state = {
    purchasing: false,
  };
  componentDidMount() {
    this.props.initIngredients();
  }
  updatePurchaseState(ingredients) {
    return ingredients.fish !== null && ingredients.veggie.length === 2;
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseHandler = () => {
    if (this.props.isAuth) this.setState({ purchasing: true });
    else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseContinueHandler = () => {
    this.props.onAddRoll(this.props.ings);
    this.setState({ purchasing: false });
  };

  render() {
    let sushi = this.props.error ? <p>cant load</p> : <Spinner />;
    let orderSummary = <Spinner />;
    const disabledInfo = this.props.ings.veggie.length === 0;

    const fishInfo = { salmon: false, tuna: false };

    fishInfo[this.props.ings.fish] = true;

    const disabledInfoAdd = this.props.ings.veggie.length === 2;

    if (this.props.ings) {
      sushi = (
        <Aux>
          <Sushi sushi={this.props.ings} />
          <BuildrControls
            clickAdd={this.props.onIngredientAdded}
            clickRemove={this.props.onIngredientRemoved}
            setFish={this.props.onSetIngredientFish}
            disabled={disabledInfo}
            disabledFish={fishInfo}
            disabledAdd={disabledInfoAdd}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.totalPrice + this.props.fishPrice}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuth}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          totalPrice={this.props.totalPrice + this.props.fishPrice}
          ingredients={this.props.ings}
          modalClosed={this.purchaseCancelHandler}
          modalContinue={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {sushi}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.sushiBuilder.ingredients,
    sushi: state.sushiBuilder.sushi,
    totalPrice: state.sushiBuilder.totalPrice,
    fishPrice: state.sushiBuilder.fishPrice,
    error: state.sushiBuilder.error,
    isAuth: state.auth.token !== null,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetIngredientFish: (ingName) =>
      dispatch(actionType.setIngredientFish(ingName)),
    onIngredientAdded: (ingName) => dispatch(actionType.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actionType.removeIngredient(ingName)),
    initIngredients: () => dispatch(actionType.initIngredient()),
    onInitPurchase: () => dispatch(actionType.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actionType.setAuthRedirectPath(path)),
    onAddRoll: (sushiRoll) => dispatch(actionType.addRoll(sushiRoll)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(axiosMessageHandler(SushiBuilder, axios));
