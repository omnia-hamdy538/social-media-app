import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { authContext } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';

export default function ProtectedRoute({children}) {
   
    const{isLoggedIn}=useContext(authContext);
  return  isLoggedIn ? children: <LoginPage/>
}
