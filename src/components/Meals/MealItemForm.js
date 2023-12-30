import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";
import { useContext, useState } from "react";
import CartContext from '../../store/cart-context';

const MealItemForm = (props) => {

  const [quantity, setQuantity] = useState(1); // Manage quantity with state

  const cartCxt = useContext(CartContext);// when we use useContext then we are taking copy of global Store(Cartcontext properties) like in cartCxt = {...CartContext}; so we can't just update or push current event value to that cartcontext items array for that we have to call the context fn addItem and passed the current item there it will update this item to item array by useState

  const addItemToCart = (event) =>  {
    event.preventDefault();
    cartCxt.addItem({ ...props.item, quantity: +quantity });
    console.log(props); // Convert quantity to a number//we increase and passed to fn with added whole item obj(which is whole props which we received from main parent AvailableMeals) to items array. NOTE- we are working with our own DUMMY_ITEMS.
  }
  const quantityChangeHandler = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <form className={classes.form}>
      <Input 
        label="Amount" 
        input={{ 
          id: "amount_" + props.id, 
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          value: quantity, // Use state value for the input value
          onChange: quantityChangeHandler, // Handle input change
        }} 
      /> {/* We created another Input reusable compo and passing props to that here all this key value pairs of input object we will take it in Input compo using spread operator as {...props.input} */}
      <button onClick={addItemToCart}>+ Add</button> 
    </form>
  );
};

export default MealItemForm;
