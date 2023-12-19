import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';
import { useContext } from 'react';

import React from 'react'

const HeaderCartButton = (props) => {

  const cartCtx = useContext(CartContext);//hmne CartProvider se app.js me wrap kiya waha header bhi wrapped hua aur header ke andar h ye HeaderCartButton to hmne yha useContext liya aur sari provider ki properties ko access kr sakte h cartCtx me storre kiye fir niche cartCtx.items me reduce apply kr diye mtlb sare items ke total count milenge aur niche usko span me show kr diye jaise hi kr baar items change honge ye useContext fir chalega

  let quantity = 0;
  cartCtx.items.forEach((item) => { //sare items ki quantity ko add kr diye total nikalke quantity me
    return quantity = quantity + Number(item.quantity);
  });
  return (
    <button className={classes.button} onClick={props.onShowCart}>
      <span className={classes.icon}> <CartIcon/> </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  )
}

export default HeaderCartButton
