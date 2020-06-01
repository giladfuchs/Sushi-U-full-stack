import * as actionTypes from "./actionTypes";

export const initItems = () => {
  return {
    type: actionTypes.INIT_SUSHI_ITEMS,
  };
};

export const fetchItemsFailed = () => {
  return {
    type: actionTypes.FETCH_ITEMS_FAILED,
  };
};

export const setItems = (items) => {
  return {
    type: actionTypes.SET_SUSHI_ITEMS,
    items: items,
  };
};

export const deleteItem = (itemId) => {
  return {
    type: actionTypes.DELETE_ITEM,
    itemId: itemId,
  };
};
export const deleteItemSuccess = (itemId) => {
  return {
    type: actionTypes.DELETE_ITEM_SUCCESS,
    itemId: itemId,
  };
};
export const deleteItemFailed = () => {
  return {
    type: actionTypes.DELETE_ITEM_FAILED,
  };
};

export const addItemToCart = (itemId, token) => {
  return {
    type: actionTypes.ADD_ITEM_TO_CART,
    itemId: itemId,
    token: token,
  };
};

export const addItemToCartSuccess = () => {
  return {
    type: actionTypes.ADD_ITEM_CART_SUCCESS,
  };
};
export const addItemToCartFailed = () => {
  return {
    type: actionTypes.ADD_ITEM_CART_FAILED,
  };
};

export const deleteItemStart = () => {
  return {
    type: actionTypes.DELETE_ITEM_START,
  };
};
