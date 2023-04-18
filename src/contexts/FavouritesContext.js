import { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { getUserFavourites, updateUserFavourites } from '../utils/firebase.utils'

export const FavouritesContext = createContext({
    favourites: []
})

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]) //!!!MOVE TO FavouritesContext
    const { user } = useContext(AuthContext)

    useEffect(() => {
        
    }, [favourites])

    return <FavouritesContext.Provider value={{
        favourites
    }}>
        {children}
    </FavouritesContext.Provider>
}