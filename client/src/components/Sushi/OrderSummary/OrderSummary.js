import React, { Component } from "react";

import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  state = {};

  render() {
    console.log(this.props.ingredients);

    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{"   "}
            {igKey === "veggie"
              ? this.props.ingredients[igKey].map((ing) => ing + ", ")
              : this.props.ingredients[igKey] + "."}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price : {this.props.totalPrice}</strong>
        </p>
        <p>Continue to chekout?</p>

        <Button clicked={this.props.modalClosed} btnType="Danger">
          Cancel
        </Button>
        <Button clicked={this.props.modalContinue} btnType="Success">
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
