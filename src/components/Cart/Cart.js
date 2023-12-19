import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const itemQuantities = {};
  // Loop through each item in the cart
  cartCtx.items.forEach((item) => {
    // Use a combination of id and name as a unique identifier
    const identifier = `${item.id}-${item.name}`; //if (!itemQuantities[item.id]) this was doing problem of only id

    // Check if the item is already in the itemQuantities object
    if (!itemQuantities[identifier]) {
      // If it's not in the object, create a new entry for it
      itemQuantities[identifier] = {
        name: item.name,
        price: item.price,
        quantity: 0,
      };
    }

    // Add the quantity of the current item to its entry in the itemQuantities object
    itemQuantities[identifier].quantity += item.quantity;
  });

  // At this point, itemQuantities is an object that contains the total quantity for each unique item in the cart

  const cartItems = (
    // <ul className={classes['cart-items']}>
    //   {cartCtx.items.map((item) => (
    //     <li key={item.id}>Name: {item.name} Price: {item.price} Quantity: {item.quantity}</li>
    //   ))}
    // </ul>
    <ul className={classes["cart-items"]}>
      {Object.values(itemQuantities).map((item) => (
        <li key={item.id}>
          Name: {item.name} Price: {item.price} Quantity: {item.quantity}
        </li>
      ))}
    </ul>
  );
  let totalAmount = 0;
  cartCtx.items.forEach((item) => {
    return (totalAmount = totalAmount + item.price);
  });

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
