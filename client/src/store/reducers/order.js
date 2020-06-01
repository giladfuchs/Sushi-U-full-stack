import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.PURCHASE_SUSHI_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.PURCHASE_SUSHI_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
      };
    case actionTypes.PURCHASE_SUSHI_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders,
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        orders: [],
      };

    default:
      return state;
  }
};

export default reducer;
