import * as actionTypes from "./actionTypes";

export const authSuccess = () => {
  return {
    type: actionTypes.AUTH_SUCCESS,

  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
export const checkAuthTimeout = expireTime => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expireTime: expireTime
  };
};
export const logout = () => {
  return {
    type: actionTypes.AUTH_INITTIATE_LOGOUT
  };
};
export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignUp: isSignUp
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
};
