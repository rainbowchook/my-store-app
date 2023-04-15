import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signUpUser, signInUser, signOutUser } from '../utils/firebase.utils'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
            
        })
        return () => {
            unsubscribe()
            setUser(null)
        }
    }, [])

    return (
        <AuthContext.Provider value={
            {
                user
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}
