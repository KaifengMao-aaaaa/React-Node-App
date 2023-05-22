import './App.css';
import axions from 'axios'
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import HomePage from './pages/homepage';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path= '/' element = {<HomePage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
