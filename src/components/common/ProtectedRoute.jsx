import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../utils/auth'

const ProtectedRoute = ({ children = null }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={'/login'} replace />
    }

    return children ? children : <Outlet />
}

const LoginRoute = ({ children = null }) => {

    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={'/'} replace />
    }
    return children ? children : <Outlet />
}

export { ProtectedRoute, LoginRoute }
