import React from 'react';

const Fragment = React.Fragment;
const orderSummary = (props) => {
  const ingredientSum = Object.keys(props.ingredients)
    .map((igKey) => {
      return(
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
      </li>
      //We used span to capitalize the igKey
    )})
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSum}
      </ul>
      <p>Continue to Checkout?</p>
    </Fragment>
  )
};

export default orderSummary;