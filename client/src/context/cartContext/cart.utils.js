export const addItemToCart = (cartItems, cartItemToAdd) => {
    
    const existingItem = cartItems.find((cartItem) => cartItem._id === cartItemToAdd._id);

    if (existingItem) {
        return cartItems.map((cartItem) => {
            if (cartItem._id === cartItemToAdd._id) {
                 return {...cartItem, quantity: cartItem.quantity + 1}
            } else return cartItem
        })
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1}];
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToRemove._id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem._id !== cartItemToRemove._id);
  }

  return cartItems.map((cartItem) =>
    cartItem._id === cartItemToRemove._id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const filterItemFromCart = (cartItems, item) =>
  cartItems.filter((cartItem) => cartItem._id !== item._id);

export const getCartItemsCount = (cartItems) =>
  cartItems.reduce(
    (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity,
    0
);

export const getCartTotal = (cartItems) =>
  cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
);



