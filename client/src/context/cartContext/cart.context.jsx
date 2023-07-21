import React, {useState, createContext, useEffect } from 'react';

import { addItemToCart, removeItemFromCart, filterItemFromCart, getCartItemsCount, getCartTotal,  } from './cart.utils';

export const CartContext = createContext(
    {   
    cartItemsCount: 0,
    cartTotal: 0,
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    clearItemFromCart: () => {},
    clearCart: () => {},
    }   
); 
const localCart = JSON.parse(localStorage.getItem('localCart')) || [];

const CartProvider = ({ children }) => {
    
    const [cartItems, setCartItems] = useState(localCart);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    

    const addItem = (item) => {
        setCartItems(addItemToCart(cartItems, item))         
    }

    const removeItem = (item) => {
        setCartItems(removeItemFromCart(cartItems, item))   
    }

    const clearItemFromCart = (item) => {
        setCartItemsCount(filterItemFromCart(cartItems, item))
    }

    const clearCart = () => {
        setCartItems([]);
        setCartItemsCount(0);
        setCartTotal(0);
        localStorage.setItem("localCart", [])
    }
    
    useEffect(() => {
        setCartItemsCount(getCartItemsCount(cartItems));
        setCartTotal(getCartTotal(cartItems));
        localStorage.setItem("localCart", JSON.stringify(cartItems));
      }, [cartItems]);

    return (
        <CartContext.Provider value={{
            cartItems,
            cartTotal,
            cartItemsCount,
            addItem,
            removeItem,
            clearItemFromCart,
            clearCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;