import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  /*const itemQuantities = {};
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
  });*/ // At this point, itemQuantities is an object that contains the total quantity for each unique item in the cart

  // ---------------BreakDown understanding of below code for cart---------------------
  /* Suppose cartContext items having two item //   cartCtx.items = [
   { id: 'sushi123', name: 'Sushi', price: 22.99, quantity: 3 },
   { id: 'schnitzel456', name: 'Schnitzel', price: 16.5, quantity: 2 },
 ]; Now another quantity is added actually 5 quantity of shushi is added/increased only and this cart again re-renders with all these 3 items updated { id: 'sushi123', name: 'Sushi', price: 22.99, quantity: 5 },

 now this cart will re-render with updated items so "const itemQuantities = [];" this again sets to empty array
 this now forEach will run first again for sushi123 made identifier "sushi123" now using find method(which looped in each element and find targeting condition) in itemQuantities array so it empty in first iteration we go to else condition and added whole properties in array.

 Now second iteration itemQuantities this array has sushi123(this) item forEach runs again for second element and made identifier schnitzel456 then again using find method we didn't find this identifier in itemQuantities array again we go to else loop and pushed all properties of schnitzel456 item with identifier to itemQuantities array.

 Now third iteration of forEach itemQuantities[item1, item2,] having both items now forEach will make identifier of third item sushi123 which is same as first one becaus same items's quantity is increasd/added so in find method we find in itemQuantities array that is array ka koi identifier kya current identifier jo banaye h uske equal h? to ha array me already shushi ka identifier first me push kiye the to third time identifier shushi bnane me match ho gya aur us element ya obj ko existing item me rakh liye to if me gye aur existingItem(obj) already h array me to jo obj(existingItem) ki quantity this jo first time shushi me 3 thi to usme add kiye current item(forEach me define krne ke liye h item keyword jo curr obj ke liye) ki quantity jo 5 h ab us element(shushi) ki quantity 8 ho gyi. ab niche cartItems variable me map chalaye itemQuantities array ke liye aur is array ki tota quantity bhi show kr diye cart me.
 */

  const itemQuantities = [];
  cartCtx.items.forEach((item) => {
    const identifier = `${item.id}-${item.name}`;//id bs use kr sakte the pr match ho rhi thi to identifer le liye

    // Check if the item is already in the itemQuantities array
    const existingItem = itemQuantities.find(
      (quantities) => quantities.identifier === identifier
    );
    if (existingItem) {
      // If it's already in the array, update the quantity ye quantity itemQuantities array me update ho gyi
      existingItem.quantity += item.quantity;
    } else {
      // If it's not in the array, obj banake push kr diye quantities wale array me sb fir agli baar se if me 
      itemQuantities.push({// sirf quantities update kr denge agar same product add hua to
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        identifier: identifier, // Add the identifier to the new entry
      });
    }
  }); // At this point, itemQuantities is an array that contains the total quantity for each unique item in the cart

  const updateQuantityHandler = (itemId, newQuantity) => {
    // Find the item in cartCtx.items and update its quantity
    const updatedItems = cartCtx.items.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item // if current catCtx item ki id equal hui jo 
    );// targetted - or + item ki id se equal h to object me pura same items bs quanitity newQuantity se update krke updatedItems me store kiye aur updateItems cartCtx ka call krke item array me set kr diye useState se
    console.log(cartCtx.items, updatedItems);
    cartCtx.updateItems(updatedItems);
  }
  const cartItems = (
    // <ul className={classes['cart-items']}>
    //   {cartCtx.items.map((item) => (
    //     <li key={item.id}>Name: {item.name} Price: {item.price} Quantity: {item.quantity}</li>
    //   ))}
    // </ul>
    <ul className={classes["cart-items"]}>
    {itemQuantities.map((item) => ( //ye li sirf cart ke liye h aur itemQuantities array sirf cart ke liye banaye taki hm total quantity count krke cart me group kr sake items ke sath pr hme sb kuchh same price sb chahiye tha isiliye sb copy kiye the is array me total quanitity ke sath show kr diye uper commented map code me hm total quanity aur group ni kr pa rhe the items ko
      <li key={item.id}>
        Name: {item.name} Price: {item.price} Quantity: {item.quantity}
        <button onClick={() => updateQuantityHandler(item.id, item.quantity - 1)}>-</button>
        <button onClick={() => updateQuantityHandler(item.id, item.quantity + 1)}>+</button>
      </li>
    ))}
  </ul>
  );
  const totalAmount = cartCtx.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
