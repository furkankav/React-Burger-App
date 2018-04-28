import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary'

const Fragment = React.Fragment;

const INGREDIENT_PRICES = {
  salad: 0.75,
  cheese: 1.25,
  meat: 1.80,
  bacon: 1.30
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 3.00,
    purchasable: false,
    ordering: false
  };

  orderHandler = (state) => {
    this.setState({
      ordering: state
    })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({
      purchasable: sum > 0
    });

  }

  addIngredientHandler = (type) => {
    const addCount = this.state.ingredients[type] + 1;
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = addCount;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] > 0) {
      const removeCount = this.state.ingredients[type] - 1;
      const updatedIngredients = { ...this.state.ingredients }
      updatedIngredients[type] = removeCount;
      const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: updatedPrice
      });
      this.updatePurchaseState(updatedIngredients);
    }
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Fragment>
        <Modal show={this.state.ordering}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchase={this.state.purchasable}
          order={this.orderHandler}
        />
      </Fragment>
    );
  }

}

export default BurgerBuilder;