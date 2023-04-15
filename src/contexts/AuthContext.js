import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signUpUser, signInUser, signOutUser } from '../utils/firebase.utils'

const AuthContext = createContext()
const auth = getAuth()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
        return () => {
            unsubscribe()
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
