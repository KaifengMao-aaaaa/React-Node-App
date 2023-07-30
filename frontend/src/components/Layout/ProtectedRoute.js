import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../AuthContext';
function ProtectedRoute ({ component, section }) {
  const [token, _] = React.useContext(AuthContext);
  if (localStorage.getItem('availablePages') === null) {
    return <Navigate to="/user/login"/>;
  }
  const availablePages = localStorage.getItem('availablePages').split(',');
  if (!token) {
    return <Navigate to="/user/login"/>;
  } else if (!availablePages.includes(section)) {
    return <Navigate to="/"/>;
  }
  return component;
}

export default ProtectedRoute;
