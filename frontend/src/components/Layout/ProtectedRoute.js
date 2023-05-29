import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import AuthContext from '../../AuthContext';

function ProtectedRoute({component}) {
    const uId = React.useContext(AuthContext);
    if (!uId) {
        return <Navigate to="/user/login"/>;
    }
    return component
}

export default ProtectedRoute;