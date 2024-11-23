import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.min.css'
import Login from './pages/Login'
import Home from './user/pages/Home'
import Dashboard from './pages/admin/Dashboard'
import AdminProtected from './share/AdminProtected'
import AdminOrders from './components/AdminOrders'
import AdminProducts from './components/AdminProducts'
import Cart from './user/components/Cart'
import Payment from './user/components/Payment'
import UserLogin from './user/pages/UserLogin'
import AdminUsers from './components/AdminUsers'
import OrderSuccess from './user/components/OrderSuccess'
import UserRegister from './user/pages/UserRegister'
import UserProtected from './user/pages/UserProtected'
import My_Order from './user/components/My_Order'
import Navbar from './user/components/Navbar'
import { GoogleOAuthProvider } from '@react-oauth/google'
const App = () => {
  return <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <ToastContainer />
      <Routes>

        <Route path='/userRegister' element={<UserRegister />} />
        <Route path='/userLogin' element={<UserLogin />} />

        <Route path='/' element={<><Navbar /> <Outlet /> </>}  >
          <Route index element={<Home />} />
          <Route path='cart' element={<UserProtected compo={<Cart />} />} />
          <Route path='payment' element={<UserProtected compo={<Payment />} />} />
          <Route path='success' element={<UserProtected compo={<OrderSuccess />} />} />
          <Route path='/order' element={<UserProtected compo={<My_Order />} />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='register' element={<Signup />} />

        <Route path='/admin' element={<AdminProtected compo={<Dashboard />} />}>
          <Route path='products' element={<AdminProducts />} />
          <Route path='order' element={<AdminOrders />} />
          <Route path='user' element={<AdminUsers />} />
        </Route>
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>

}

export default App