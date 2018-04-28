import React from 'react';

import styles from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) => {

  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      // Instead of a for loop for each object here we turned each object into array with the length of their object value
      // then iterate with map function
      return [...Array(props.ingredients[igKey])]
        .map((_, indx) =>
          <BurgerIngredient key={igKey + indx} type={igKey} />
        )
    })
    .reduce((prev, el) => {
      return prev.concat(el)
    }, []);//[] is initial value for prev returns prev in the end
  //reduced used to check if all arrays inside ingredients object is empty  
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients </p>
  }
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;