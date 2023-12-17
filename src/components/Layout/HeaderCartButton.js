import CartItem from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

import React from 'react'

const HeaderCartButton = () => {
  return (
    <button className={classes.button}>
      <span className={classes.icon}> <CartItem/> </span>
      <span>Your Cart</span>
      <span className={classes.badge}>3</span>
    </button>
  )
}

export default HeaderCartButton
