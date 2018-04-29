import React from 'react';

import Button from '../UI/Button/Button';

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
        <p>Your Total is <b>{props.price.toFixed(2)}</b> $</p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={() => props.cancel(false)}>CANCEL</Button>  
        <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
      </Fragment>
    )
  }


export default orderSummary;