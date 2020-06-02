import * as actionTypes from "./actionTypes";

export const purchasesushiSuccess = () => {
  return {
    type: actionTypes.PURCHASE_SUSHI_SUCCESS,
  };
};

export const purchasesushiFail = (error) => {
  return {
    type: actionTypes.PURCHASE_SUSHI_FAIL,
    error: error,
  };
};
export const purchasesushiStart = () => {
  return {
    type: actionTypes.PURCHASE_SUSHI_START,
  };
};
export const purchasesushi = (orderData, stripe) => {
  return {
    type: actionTypes.PURCHASE_SUSHI,
    stripe: stripe,
    orderData: orderData,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = () => {
  return {
    type: actionTypes.FETCH_ORDERS,

  };
};
