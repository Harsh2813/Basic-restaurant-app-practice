import React from "react";

const CartContext = React.createContext({
    items: [], // these all default values of context API even these are no use but these are usefull for autocompletion that's why we have to give default values
    addItem: (item) => {},//this fn for taking item and added to cart, Note this is just fn not having values
    removeItem: (id) => {}// and this fn taking id to remove it from cart
});

export default CartContext;
//we have created this context API now we have to manage it by providing