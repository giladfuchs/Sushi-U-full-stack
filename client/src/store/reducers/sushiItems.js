import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: null,
  error: false,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ITEMS_FAILED:
      return {
        ...state,
        error: true,
      };
    case actionTypes.SET_SUSHI_ITEMS:
      return {
        ...state,
        items: action.items,
        error: false,
      };
    case actionTypes.DELETE_ITEM_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case actionTypes.DELETE_ITEM_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.DELETE_ITEM_SUCCESS:
      const items = [...state.items].filter(
        (item) => item._id !== action.itemId
      );
      return {
        ...state,
        items: items,
        error: false,
        loading: false,
      };

    case actionTypes.ADD_ITEM_CART_FAILED:
      return {
        ...state,
        error: true,
      };
    case actionTypes.ADD_ITEM_CART_SUCCESS:
      return {
        ...state,
        error: false,
        modal: true,
      };

    default:
      return state;
  }
};

export default reducer;
