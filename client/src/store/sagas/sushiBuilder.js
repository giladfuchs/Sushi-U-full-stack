import { put } from "redux-saga/effects";
import axios from "../../axios-api";
import * as actions from "../actions/index";

export function* initIngredient(action) {
  try {
    const response = yield axios.get("/price/price");

    yield put(actions.setIngredient(response.data[0].price));
  } catch (error) {
    yield put(actions.fetchIngredientFailed());
  }
}

export function* addRoll(action) {
  try {


    const ans = yield axios.post(
      "/items/items/addsushi",
      action.sushiRoll
    );


    yield put(actions.addItemToCartSuccess());
  } catch (error) {


    yield put(actions.addItemToCartFailed());
  }
}
