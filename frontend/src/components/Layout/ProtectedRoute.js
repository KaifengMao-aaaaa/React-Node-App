import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import AuthContext from '../../AuthContext';

function ProtectedRoute({component}) {
    const [token, setToken] = React.useContext(AuthContext);
    if (!token) {
        return <Navigate to="/user/login"/>;
    }
    return component
}

export default ProtectedRoute;