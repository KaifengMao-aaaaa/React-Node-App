import './App.css';
import React from 'react';
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
import { AuthProvider } from './AuthContext';
import HistoryPage from './pages/historyPage';
import Test from './pages/test';
import RetrievePasswordPage from './pages/retrievePasswordPage';
import EditPage from './pages/editPage';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
function App() {
  const [token , setToken] = React.useState(localStorage.getItem('token'))
  function setAuth(token) {
    localStorage.setItem('token', token);
    setToken(token)
  }

  return (

    <AuthProvider value={[token, setToken]}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/test' element = {<Test/>}/>
          <Route exact path='/user/login' element = {<LoginPage saveId = {setAuth}/>} />
          <Route exact path='/user/register' element = {<SignUp saveId = {setAuth}/>} />
          <Route exact path='/user/retrievePassword' element = {<RetrievePasswordPage saveId = {setAuth}/>} />
          <Route element = {<SideBar/>}>
            <Route path= '/' element = {<ProtectedRoute component = {<HomePage/>}/>} />
            <Route path= '/order/:orderId' element = {<ProtectedRoute component={<OrderDetailPage/>} />} />
            <Route path= '/order' element = {<ProtectedRoute component={<OrderPage/>}/>} />
            <Route path= '/store' element = {<ProtectedRoute component={<StorePage/>}/>} />
            <Route path= '/product/:productId' element = {<ProtectedRoute component={<ProductDetailPage/>} />} />
            <Route path= '/product' element = {<ProtectedRoute component={<ProductPage/>}/>} />
            <Route path= '/history' element = {<ProtectedRoute component={<HistoryPage/>} />} />
            <Route path= '/user' element = {<ProtectedRoute component={<UserPage/>}/> }/>
            <Route path= '/edit' element = {<ProtectedRoute component={<EditPage/>}/> }/>
          </Route>
        </Routes>

      </BrowserRouter>

      <NotificationContainer/>
    </AuthProvider>
  )
}

export default App;
