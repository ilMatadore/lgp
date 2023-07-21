// import React, { lazy, Suspense } from 'react';
import React from 'react';
import {Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import { UserProvider } from './context/userContext/user.context';
import CartProvider from './context/cartContext/cart.context';

// import ErrorBoundary from './components/errorBoundary/errorBoundary.component';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.components';

// const HomepagePage = lazy(() => import('./pages/homepage/homepage.page'));
// const SignInPage = lazy(() => import('./pages/signIn-page/signin-page'));
// const RegisterPage = lazy(() => import('./pages/register-page/register-page'));
// const ProfilePage = lazy(() => import('./pages/profilepage/profile-page'));
// const CartPage = lazy(() => import('./pages/cartpage/cart.page'));
// const CheckoutPage = lazy(() => import('./pages/checkoutpage/checkout.page'));
// const ContactPage = lazy(() => import('./pages/contactpage/contact.page'));
// const AdminPage = lazy(() => import('./pages/adminpage/admin.page'));
// const QuienesPage = lazy(() => import('./pages/quienes/quienes.page'));
import HomePage from './pages/homepage/homepage.page';
import SignInPage from './pages/signIn-page/signin-page';
import RegisterPage from'./pages/register-page/register-page';
import ProfilePage from'./pages/profilepage/profile-page';
import CartPage from'./pages/cartpage/cart.page';
import CheckoutPage from './pages/checkoutpage/checkout.page';
import ContactPage from'./pages/contactpage/contact.page';
import AdminPage from'./pages/adminpage/admin.page';
import QuienesPage from'./pages/quienes/quienes.page';

function App() {

  const path = useLocation().pathname;
  const location = path.split("/")[1];


  // console.log(JSON.parse(localStorage.getItem('accessToken')));
  // console.log(JSON.parse(localStorage.getItem('localCart')));


  return (
    <UserProvider>
      <CartProvider>
        <div className={"app " + location}>
              <Header />
                {/* <ErrorBoundary> */}
                <Routes>
                  {/* <Suspense fallback={<div className="loading">...Cargando</div>}> */}
                    <Route exact path="/" element={<HomePage />}/>            
                    <Route exact path='/admin' element={<AdminPage />}/>
                    <Route exact path="/signin" element={<SignInPage />}/>
                    <Route exact path="/register" element={<RegisterPage />}/>
                    <Route exact path="/profile" element={<ProfilePage />}/>
                    <Route exact path="/cart" element={<CartPage />}/>
                    <Route exact path="/checkout" element={<CheckoutPage />}/>
                    <Route exact path="/contact" element={<ContactPage />}/>
                    <Route exact path="/quienes" element={<QuienesPage />}/>
                  {/* </Suspense> */}
              </Routes>      
              {/* </ErrorBoundary> */}
          <Footer />
        </div> 
      </CartProvider>
    </UserProvider>
 
  );
}

export default App;
