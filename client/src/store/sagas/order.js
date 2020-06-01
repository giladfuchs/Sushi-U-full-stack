import { put } from "redux-saga/effects";
import axios from "../../axios-api";
import * as actions from "../actions/index";

export function* purchasesushi(action) {
  try {

    console.log(action.orderData);

    yield put(actions.purchasesushiStart());
    yield axios.post("/order/order", action.orderData);

    yield put(actions.purchasesushiSuccess());
  } catch (error) {
    yield put(actions.purchasesushiFail());
  }
}
export function* fetchOrders(action) {
  yield put(actions.fetchOrderStart());


  try {
    const response = yield axios.get("/order/orders");
    yield put(actions.fetchOrderSuccess({ ...response.data }));
  } catch (error) {
    yield put(actions.fetchOrderFail(error));
  }
}
