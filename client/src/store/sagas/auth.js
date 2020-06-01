import { put, delay, call } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios-api";

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield call([localStorage, "removeItem"], "userId");

  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeout(action) {
  yield delay(action.expireTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    phone: 33,
    name: "true",
  };

  const url = action.isSignUp ? "/auth/signup" : "/auth/login";

  try {
    const res = yield axios.post(url, authData);
    console.log(res.data);

    yield localStorage.setItem("token", res.data.token);
    yield localStorage.setItem(
      "expirationDate",
      new Date(yield new Date().getTime() + 10000000)
    );
    yield localStorage.setItem("userId", res.data.userId);
    yield put(actions.authSuccess());
    yield put(actions.checkAuthTimeout(10000000));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckState(action) {
  const token = yield localStorage.getItem("token");
  if (!token) yield put(actions.logout());
  else {
    const expirationDate = yield new Date(
      yield localStorage.getItem("expirationDate")
    );
    if (expirationDate < new Date()) yield put(actions.logout());
    else {
      yield put(actions.authSuccess());
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - (yield new Date().getTime())) / 1000
        )
      );
    }
  }
}
