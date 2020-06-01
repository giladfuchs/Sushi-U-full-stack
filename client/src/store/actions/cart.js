import * as actionTypes from "./actionTypes";

export const fetchCart = () => {
  return {
    type: actionTypes.FETCH_CART,
  };
};
export const startFetchCart = () => {
  return {
    type: actionTypes.START_FETCH_CART,
  };
};
export const fetchCartSuccess = (cart) => {
  return {
    type: actionTypes.FETCH_CART_SUCCESS,
    cart: cart,
  };
};
export const fetchCartFail = () => {
  return {
    type: actionTypes.FETCH_CART_FAILED,
  };
};
