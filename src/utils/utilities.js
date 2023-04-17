export const isCartItemFound = (cartItems, itemId) => {
    console.log(cartItems.findIndex(cartItem => cartItem.id === itemId))
    return cartItems.findIndex(cartItem => cartItem.id === itemId) < 0 ? false : true
}

export const getCartItem = (cartItems, itemId) => {
    return cartItems.find(cartItem => cartItem.id === itemId)
}

export const updateCartItem = (cartItems, item) => {
    return cartItems.map(cartItem => cartItem.id === item.id ? item : cartItem)
}

export const addToExistingCartItem = (cartItems, itemId) => {
    return cartItems.map(cartItem => cartItem.id === itemId ? {...cartItem, ...{quantity: cartItem.quantity + 1}} : cartItem)
}

// export const addNewCartItem = (cartItems, itemId) => {
//     return [...cartItems, {id: itemId, quantity: 1}]
// }
export const addNewCartItem = (cartItems, item) => {
    return item.quantity === undefined ? [...cartItems, {...item, ...{quantity: 1}}] : [...cartItems, {...item, ...{quantity: item.quantity}}]
}

export const removeFromExistingCartItem = (cartItems, itemId) => {
    return cartItems.map(cartItem => cartItem.id === itemId ? {...cartItem, ...{quantity: cartItem.quantity - 1}} : cartItem)
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

export const calculateCartSubtotal = (cartItems) => {
    return cartItems.reduce((acc, curr) => acc + (curr.quantity * curr.amount), 0)
}

export const parseIntToDollarsAndCents = (num) => {
    const dollars = Math.floor(num / 100)
    const cents = num % 100

    return `${dollars}.${cents < 10 ? `0${cents}` : cents}`
}

export const isEmptyObject = (value) => {
    return typeof value === 'object' && value != null && Object.keys(value).length === 0 ? true : false
}