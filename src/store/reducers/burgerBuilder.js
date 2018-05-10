
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 3,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.75,
  cheese: 1.25,
  meat: 1.80,
  bacon: 1.30
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
      }
      return updateObject(state, updatedState);
    /* return {
      ...state,
      ingredients: {
        ...state.ingredients,
        //Used sqare braces to use variable as a attribute name
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      },
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }; */
    case actionTypes.REMOVE_INGREDIENT:
      const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
      const updatedIngs = updateObject(state.ingredients, updatedIng);
      const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
      }
      return updateObject(state, updatedSt);
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        //Opened ingredients here since database returns defferent order on ingredients and it affects look of burger
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        error: false,
        totalPrice: 3,
        building: false
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {error: true});
    default:
      return state;
  }
}

export default reducer;