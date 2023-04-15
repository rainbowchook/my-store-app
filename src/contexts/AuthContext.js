import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signUpUser, signInUser, signOutUser } from '../utils/firebase.utils'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isSignedIn, setIsSignedIn] = useState(false)
    console.log('authprovider user', user)
    console.log('signed in?', isSignedIn)
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
        return () => {
            unsubscribe()
            setUser(null)
            setIsSignedIn(false)
        }
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
