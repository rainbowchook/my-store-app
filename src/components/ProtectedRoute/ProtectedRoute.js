import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { isSignedIn } = useContext(AuthContext)
    const location = useLocation()

    if(!isSignedIn) {
        return <Navigate to='/signin' state={{ from: location}} replace />
    }
    return children
}

export default ProtectedRoute