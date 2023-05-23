import './App.css';
import axions from 'axios'
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/homepage';
import SideBar from './components/Layout/SideBar';
import LoginPage from './pages/loginpage';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='login' element = {<LoginPage />}/>
        <Route element = {<SideBar/>}>
          <Route path= '/' element = {<HomePage/>} />
          <Route path= '/order/:orderId' element = {<HomePage/>} />
          <Route path= '/user/:userId' element = {<HomePage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
