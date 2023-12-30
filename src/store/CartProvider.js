import CartContext from "./cart-context";
import { useState } from "react";

const CartProvider = (props) => {

    const [items, setItems] = useState([]);

    const addItemToCartHandler = (item) => {//we made this fn because when add button which is in another compo, will click to add item in cart so we have to push that item in this items array of cartcontext so we will call this fn by passing that item as param and by useState this item added with items array and update the state then re render the compo with updated values
        setItems([...items, item]);
    }

    const removeItemToCartHandler = (id) => {
        setItems(items.filter(item => item.id !== id));
    }
    const updateItemsHandler = (updatedItems) => {
        setItems(updatedItems);
    };

    const cartContext = {
        items: items,//if we dont used useState then after reloading page of after re render this items array got empty, so we have to pass updated items here
        addItem: addItemToCartHandler, //now in CartContext it was having just fn here we initialized it with value
        removeItem: removeItemToCartHandler,// above fn will give values to here so now it is updated with values
        updateItems: updateItemsHandler,
    }

    return (
        <CartContext.Provider value={cartContext}> {/* that's why we have to initialize or provide value again because now the values are updated above from only fn which cart-context having */}
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;