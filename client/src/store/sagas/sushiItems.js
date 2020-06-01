import { put } from "redux-saga/effects";
import axios from "../../axios-api";
import * as actions from "../actions/index";

export function* initItems(action) {
  try {
    const response = yield axios.get("/items/items");


    yield put(actions.setItems(response.data));
  } catch (error) {
    yield put(actions.fetchItemsFailed());
  }
}

export function* addItemToCart(action) {
  try {

    yield axios.post("/items/item/addtocart/" + action.itemId);

    yield put(actions.addItemToCartSuccess());
  } catch (error) {
    yield put(actions.addItemToCartFailed());
  }
}

export function* deleteItems(action) {
  try {
    yield put(actions.deleteItemStart());
    const answer = yield axios.delete("/items/item/" + action.itemId);
    yield put(actions.deleteItemSuccess(action.itemId));
  } catch (error) {
    yield put(actions.deleteItemFailed());
  }
}


