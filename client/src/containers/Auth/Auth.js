import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actionType from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { inputChanged } from "../../shared/utility";
import { name, email, password } from '../../shared/form.input'
class Auth extends Component {
  state = {
    controls: {
      name,
      email,
      password,
    },
    isSignUp: true,
    formIsValid: false
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath)
      this.props.onSetAuthRedirectPath();
  }

  inputChangedHandler = (event, inputIdentifier) => {

    const ans = inputChanged(this.state.controls, event, inputIdentifier);

    this.setState({ controls: ans.updatedForm, formIsValid: ans.formIsValid });


  };
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };
  SignUpModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
    let newForm = { ...this.state.controls };

    if (!this.state.isSignUp)
      newForm = { name, ...newForm };
    else
      delete newForm['name']

    this.setState({ controls: newForm });
  };

  render() {
    const formElementsArray = Object.keys(this.state.controls).map((key) => {
      return {
        id: key,
        config: this.state.controls[key],
      };
    });

    let form = formElementsArray.map((formElement) =>


      (this.state.isSignUp || formElement.id !== 'name') && (<Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
      )
    );


    if (this.props.loading) form = <Spinner />;

    const errorMessage = this.props.error ? this.props.error.message : null;

    let render = null;
    if (this.props.isAuth)
      render = <Redirect to={this.props.authRedirectPath} />;

    return (
      <div className={classes.Auth}>
        {render}
        <h1>{this.state.isSignUp ? "Register" : "Login"}
        </h1><form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success" disabled={!this.state.formIsValid}> {this.state.isSignUp ? "Register" : "Login"}</Button>
        </form>
        <Button btnType="Danger" clicked={this.SignUpModeHandler}>
          swtich to {!this.state.isSignUp ? "Register" : "Login"}
        </Button>
        <h4>{errorMessage}</h4>
        <p> user for test also the password is the e-mail</p>
        <p> sushi@sushi.com </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingsushi: state.sushiBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actionType.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actionType.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
