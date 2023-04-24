import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase.utils'

export const AuthContext = createContext({
    user: null,
    setUser: () => null,
    isSignedIn: false,
    setIsSignedIn: () => false
})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isSignedIn, setIsSignedIn] = useState(false)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setIsSignedIn(true)
            } else {
                setUser(null)
                setIsSignedIn(false)
            }
        })
        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={
            {
                user,
                isSignedIn
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}
