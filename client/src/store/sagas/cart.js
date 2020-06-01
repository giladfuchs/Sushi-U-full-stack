import { put } from "redux-saga/effects";
import axios from "../../axios-api";

import * as actions from "../actions/index";

export function* fetchCart(action) {
  try {
    yield put(actions.startFetchCart());



    const response = yield axios.get("/cart/carts");

    yield put(actions.fetchCartSuccess(response.data, action.orderData));
  } catch (error) {
    yield put(actions.fetchCartFail(error));
  }
}
