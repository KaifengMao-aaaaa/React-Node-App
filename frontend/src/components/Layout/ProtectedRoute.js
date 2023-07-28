import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import AuthContext from '../../AuthContext';
function ProtectedRoute({component, section}) {
    const [token, setToken] = React.useContext(AuthContext);
    const availablePages = localStorage.getItem('availablePages').split(','); 
    console.log(availablePages, section);
    if (!token) {
        return <Navigate to="/user/login"/>;
    } else if (!availablePages.includes(section)) {
        return <Navigate to="/"/>;
    } 
    return component
}

export default ProtectedRoute;