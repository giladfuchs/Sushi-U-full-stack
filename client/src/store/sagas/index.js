import { takeEvery, all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  logoutSaga,
  checkAuthTimeout,
  authUserSaga,
  authCheckState,
} from "./auth";
import { initIngredient, addRoll } from "./sushiBuilder";

import { initItems, deleteItems, addItemToCart } from "./sushiItems";

import { fetchCart } from "./cart";

import { fetchOrders, purchasesushi } from "./order";
export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITTIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeout);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckState);
}

export function* watchsushiBuilder() {
  yield all([
    takeEvery(actionTypes.INIT_INGREDIENTS, initIngredient),
    takeEvery(actionTypes.ADD_ROLL, addRoll),
  ]);
}
export function* watchCart() {
  yield all([takeEvery(actionTypes.FETCH_CART, fetchCart)]);
}

export function* watchsushiItems() {
  yield all([
    takeEvery(actionTypes.DELETE_ITEM, deleteItems),
    takeEvery(actionTypes.INIT_SUSHI_ITEMS, initItems),
    takeEvery(actionTypes.ADD_ITEM_TO_CART, addItemToCart),
  ]);
}
export function* watchOrder() {
  yield all([
    takeEvery(actionTypes.FETCH_ORDERS, fetchOrders),
    takeEvery(actionTypes.PURCHASE_SUSHI, purchasesushi),
  ]);
}
