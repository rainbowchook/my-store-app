export const isCartItemFound = (cartItems, itemId) => {
    return cartItems.findIndex(cartItem => cartItem.id === itemId) < 0 ? false : true
}

export const getCartItem = (cartItems, itemId) => {
    return cartItems.find(cartItem => cartItem.id === itemId)
}

export const updateCartItem = (cartItems, item) => {
    return cartItems.map(cartItem => cartItem.id === item.id ? item : cartItem)
}

export const addToExistingCartItem = (cartItems, itemId) => {
    return cartItems.map(cartItem => cartItem.id === itemId ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
}

export const addNewCartItem = (cartItems, itemId) => {
    return [...cartItems, {id: itemId, quantity: 1}]
}

export const removeFromExistingCartItem = (cartItems, itemId) => {
    return cartItems.map(cartItem => cartItem.id !== itemId ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)
}

export const clearCartItem = (cartItems, itemId) => {
    return cartItems.filter(cartItem => cartItem.id !== itemId)
}

export const isFaveItem = (favourites, itemId) => {
    return favourites.findIndex(faveItem => faveItem === itemId) < 0 ? false : true
}

export const getFaveItem = (favourites, itemId) => {
    return favourites.find(faveItem => faveItem === itemId)
}

export const addFaveItem = (favourites, itemId) => {
    return [...favourites, itemId]
}

export const removeFaveItem = (favourites, itemId) => {
    return favourites.filter(faveItem => faveItem !== itemId)
}

export const calculateCartCount = (cartItems) => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0)
}