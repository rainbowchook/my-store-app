import { createContext, useEffect, useState } from 'react'

export const ProductsContext = createContext({
    data: [],
    getItemFromInventory: () => null,
    isLoading: false,
    error: null
})
//useCallback relevant here?  or useReducer?
const findItemFromInventory = (data, itemId) => {
    for(const category in data.products) {
      let foundItem = data.products[category].find(item => item.id === itemId)
      return foundItem !== null ? {...foundItem, ...{category}} : foundItem
    }
}

export const ProductsProvider = ({ children }) => {
    const [data, setData] = useState([]) //move to ProductsContext
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const getUrl = () => {
        // if (process.env.NODE_ENV !== 'production') {
        //   return '/data/data.json'
        // }
        return '/.netlify/functions/getShopData'
      } 
    useEffect(() => {
        // setIsLoading(true)
        const fetchData = async () => {
            try {
              const url = getUrl()
              const response = await fetch(url)
            if (!response.ok || response.status !== 200 || response.status >= 400) throw new Error('Unable to fetch data')
              const data = await response.json()
              setData(data)
            } catch (e) {
              setError(error.message) // for Network-related errors AND new Errors thrown from the try block ie HTTP 404
            } finally {
              setIsLoading(false)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const getItemFromInventory = (itemId) => findItemFromInventory(data, itemId)
    
    return <ProductsContext.Provider value={{
        data,
        getItemFromInventory,
        isLoading, 
        error
    }}>
        {children}
    </ProductsContext.Provider>
}