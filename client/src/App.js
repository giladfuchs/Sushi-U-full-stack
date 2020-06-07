import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import sushiBuilder from "./containers/SushiBuilder/SushiBuilder";

import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});
const asyncItems = asyncComponent(() => {
  return import("./containers/SushiBuilder/SushiItems");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/" exact component={sushiBuilder} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/items" component={asyncItems} />
        <Redirect to="/" />
      </Switch>
    );
    if (localStorage.getItem("token") !== null)
      routes = (
        <Switch>
          <Route path="/" exact component={sushiBuilder} />
          <Route path="/items" component={asyncItems} />
          <Route path="/orders" exact component={asyncOrders} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
        </Switch>
      );

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapstateToProps, mapDispatchToProps)(App));
