import {createContext, useState} from 'react'

const UserContext = createContext({
    displayName: '',
    email: '',
    favourites: [],
    cartItems: []
})



const UserProvider = ({ children }) => {
    const [displayName, setDisplayName] = useState()
    const [email, setEmail] = useState()
    const [favourites, setFavourites] = useState([])
    const [cartItems, setCartItems] = useState([])

    const isCartItemFound = (itemId) => {
        return cartItems.findIndex(cartItem => cartItem.id === itemId)
    }

    const getCartItem = (itemId) => {
        return cartItems.find(cartItem => cartItem.id === itemId)
    }

    const addToCart = (e, id) => {
    console.log(e.target.id)
    if(!e.target.id) return
    // const itemId = e.target.id.split('-')[1]
    const itemId = id
    const cartItemIndex = isCartItemFound(id)
    if(cartItemIndex < 0) {
        setCartItems([...cartItems, { id, quantity: 1}])
    } else {
        const cartItemToUpdate = getCartItem(id)
        const newCartItem = { ... cartItemToUpdate, quantity: newCartItem.quantity + 1}
        const newCartItems = [...cartItems].splice(cartItemIndex, 1, newCartItem)
        setCartItems(newCartItems)
      // {...newCartItems[cartItemIndex], quantity: 
    }
    // setCartItems([...cartItems, e.target.id])
    // setCartItems([...cartItems, itemId])
    }

    const addToFavourites = (e, id) => {
        console.log(e.target)
        console.log(id)
        setFavourites([...favourites, id])
    }

    return (
        <UserContext.Provider value={{ 
            displayName,
            email,
            favourites,
            cartItems,
            addToCart,
            addToFavourites
        }}>
            {children}
        </UserContext.Provider>
    )
}

// const 