import * as actionTypes from "../actions/actionTypes";

const initialState = {
  cart: null,
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CART_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case actionTypes.START_FETCH_CART:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FETCH_CART_SUCCESS:
      return {
        ...state,
        cart: action.cart,
        error: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
