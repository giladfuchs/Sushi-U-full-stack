import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  tuna: 5,
  cheese: 4,
  salmon: 8,
  cucumber: 6,
};

const initialState = {
  ingredients: {
    fish: null,
    veggie: [],
  },
  sushi: [
    {
      tuna: 0,
      cheese: 0,
      salmon: 0,
      cucumber: 0,
    },
  ],
  totalPrice: 13,
  fishPrice: 0,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENT_FISH:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          // eslint-disable-next-line
          ["fish"]: [action.ingredientName],
        },
        fishPrice: INGREDIENT_PRICES[action.ingredientName],
        buliding: true,
      };
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          veggie: [...state.ingredients.veggie, [action.ingredientName]],
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        buliding: true,
      };
    case actionTypes.REMOVE_INGREDIENT:
      let veggie = [...state.ingredients.veggie];
      veggie =
        veggie.length === 1
          ? []
          : veggie[0] === [action.ingredientName]
          ? [veggie[1]]
          : [veggie[0]];
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          veggie: veggie,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        buliding: true,
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        totalPrice: action.totalPrice,
        error: false,
        buliding: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    // case actionTypes.ADD_ROLL:
    //   return {
    //     ...state,

    //   };

    default:
      return state;
  }
};

export default reducer;
