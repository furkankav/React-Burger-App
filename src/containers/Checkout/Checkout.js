import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
  constructor(props) {
    super(props);
    const query = new URLSearchParams(props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = parseFloat(param[1]);
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.state = {
      ingredients: ingredients,
      price: price
    };
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}  
        />
        <Route 
          path={this.props.match.path + '/contact-data'}
          //As we used route this way we have to push route props manually 
          render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)}/>
      </div>
    );
  }
}

export default Checkout;