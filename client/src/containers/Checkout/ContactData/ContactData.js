import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import scriptLoader from 'react-async-script-loader';


import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-api";
import Input from "../../../components/UI/Input/Input";
import axiosMessageHandler from "../../../hoc/axiosMessageHandler/axiosMessageHandler";
import { inputChanged } from "../../../shared/utility";
import { name, orderMethod } from '../../../shared/form.input'

import * as actions from "../../../store/actions/index";
const ContactData = (props) => {

  const [stripe, setStripe] = React.useState(null);

  React.useEffect(() => {
    console.log(props.isScriptLoaded, props.isScriptLoadSucceed);

    if (props.isScriptLoaded && props.isScriptLoadSucceed) {
      setStripe(window.Stripe('pk_test_0vhbUGgLB4Lt9JojLBgMvJIv00uaF8SW90'));
    }
  }, [props.isScriptLoaded, props.isScriptLoadSucceed]);

  const [orderForm, setOrderForm] = useState({
    orderMethod,
    remark: {
      ...name,
      elementConfig: {
        type: "text",
        placeholder: "Remark",
      },
      validation: {
        required: false,
      },

    },
  });


  const [formIsValid, setFormIsValid] = useState(false)


  const orderHandler = (event) => {
    event.preventDefault();

    const formData = Object.assign(
      {},
      ...Object.keys(orderForm).map((k) => ({ [k]: orderForm[k].value }))
    );



    props.onOrdersushi(formData, stripe);
  };

  const inputChangedHandler = (event, inputIdentifier) => {

    const ans = inputChanged(orderForm, event, inputIdentifier);

    setOrderForm(ans.updatedForm);
    setFormIsValid(ans.formIsValid);


  };


  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
        </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter additional data</h4>

      {form}


    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    ings: state.sushiBuilder.ingredients,
    price: state.sushiBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrdersushi: (orderData, stripe) => dispatch(actions.purchasesushi(orderData, stripe)),
  };
};
export default scriptLoader('https://js.stripe.com/v3/')(connect(
  mapStateToProps,
  mapDispatchToProps
)(axiosMessageHandler(ContactData, axios)));
