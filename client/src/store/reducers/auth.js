import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../shared/utility";
const initialState = {
  token: null,

  error: null,
  loading: false,
  authRedirectPath: "/"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updatedObject(state, { error: null, loading: true });
    case actionTypes.AUTH_SUCCESS:
      return updatedObject(state, {
        error: null,
        loading: false,
        token: "fdd"

      });
    case actionTypes.AUTH_FAIL:
      return updatedObject(state, { error: action.error, loading: false });
    case actionTypes.AUTH_LOGOUT:
      return updatedObject(state, {

      });
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return updatedObject(state, {
        authRedirectPath: action.path
      });
    default:
      return state;
  }
};

export default reducer;
