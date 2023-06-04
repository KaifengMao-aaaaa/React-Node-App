import './App.css';
import axions from 'axios'
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/homepage';
import SideBar from './components/Layout/SideBar';
import LoginPage from './pages/loginpage';
import OrderPage from './pages/orderpage';
import StorePage from './pages/storePage';
import OrderDetailPage from './pages/orderDetailPage';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import SignUp from './pages/registerPage';
import ProductPage from './pages/productpage';
import ProductDetailPage from './pages/productDetailPage';
import UserPage from './pages/userPage';
import Test from './components/test';
import { AuthProvider } from './AuthContext';
function App() {
  const [uId , setUId] = React.useState(localStorage.getItem('uId'))
  function setAuth(uId) {
    localStorage.setItem('uId', uId);
    setUId(uId)
  }

  return (
    <AuthProvider value={[uId, setUId]}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/user/login' element = {<LoginPage saveId = {setAuth}/>} />
          <Route exact path='/user/register' element = {<SignUp saveId = {setAuth}/>} />
          <Route element = {<SideBar/>}>
            {/* <Route path='/test' element={<ProtectedRoute/>}/> */}
            <Route path= '/' element = {<ProtectedRoute component = {<HomePage/>}/>} />
            {/* <Route path='/' element={HomePage}/> */}
            <Route path= '/order' element = {<ProtectedRoute component={<OrderPage/>}/>} />
            <Route path= '/order/:orderId' element = {<ProtectedRoute component={<OrderDetailPage/>} />} />
            <Route path= '/store' element = {<ProtectedRoute component={<StorePage/>}/>} />
            <Route path= '/product' element = {<ProtectedRoute component={<ProductPage/>}/>} />
            <Route path= '/product/:productId' element = {<ProtectedRoute component={<ProductDetailPage/>} />} />
            <Route path= '/user' element = {<UserPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  </AuthProvider>
  )
}

export default App;
