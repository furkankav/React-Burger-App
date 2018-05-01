import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/Wrapper/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders';


const Fragment = React.Fragment;

const INGREDIENT_PRICES = {
  salad: 0.75,
  cheese: 1.25,
  meat: 1.80,
  bacon: 1.30
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 3.00,
    purchasable: false,
    ordering: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
      
  }

  orderHandler = (state) => {
    this.setState({
      ordering: state
    })
  }

  purchaseContinueHandler = () => {
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice, // You should normally evaluate price on server side so user can't manipulate
      customer: {
        name: 'Max',
        address: {
          street: 'Test Street 1',
          zipcode: '77008',
          country: 'USA'
        },
        email: 'test@gmail.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({
          loading: false,
          ordering: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          ordering: false
        });
      });
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

    let burger = this.state.error ? <p>Ingredients can't be loaded!</p>:<Spinner />;
    let orderSummary = null;
    if (this.state.ingredients) {
      burger = (
        <Fragment>
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
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        cancel={this.orderHandler}
        continue={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />;
    }
    
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Fragment>
        <Modal show={this.state.ordering} clicked={this.orderHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }

}

export default withErrorHandler(BurgerBuilder, axios);