import * as actionTypes from "./actionTypes";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};
export const setIngredientFish = (name) => {
  return {
    type: actionTypes.SET_INGREDIENT_FISH,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredient = (price) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    totalPrice: price,
  };
};
export const fetchIngredientFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};
export const initIngredient = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
  };
};

export const addRoll = (sushiRoll) => {
  return {
    type: actionTypes.ADD_ROLL,
    sushiRoll: sushiRoll,
  };
};
