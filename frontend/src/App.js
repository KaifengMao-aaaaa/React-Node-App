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
import SignUp from './pages/registerPage';
import ProductPage from './pages/productpage';
import ProductDetailPage from './pages/productDetailPage';
import UserPage from './pages/userPage';
import Test from './components/test';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path= '/test' element = {<Test/>} />
        <Route exact path='/user/login' element = {<LoginPage />}/>
        <Route exact path='/user/register' element = {<SignUp />}/>
        <Route element = {<SideBar/>}>
          <Route path= '/' element = {<HomePage/>} />
          <Route path= '/order' element = {<OrderPage/>} />
          <Route path= '/order/:orderId' element = {<OrderDetailPage/>} />
          <Route path= '/store' element = {<StorePage/>} />
          <Route path= '/product' element = {<ProductPage/>} />
          <Route path= '/product/:productId' element = {<ProductDetailPage/>} />
          <Route path= '/user' element = {<UserPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
