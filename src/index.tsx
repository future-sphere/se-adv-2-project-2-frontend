import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Layout from './components/Layout';
import ProductPage from './pages/Product';
import SubCategoryPage from './pages/Subcategory';
import CategoryPage from './pages/Category';
import { SigninPage } from './pages/Signin';
import { SignupPage } from './pages/Signup';
import ProfilePage from './pages/Profile';
import OrderDetailPage from './pages/Order';
import { Notification } from '@bctc/components';
import CartPage from './pages/Cart';
import { CheckoutPage } from './pages/Checkout';
import CheckoutSuccessPage from './pages/CheckoutSuccess';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Notification />
    <RouterProvider
      router={createBrowserRouter([
        {
          path: '/',
          element: <Layout />,
          errorElement: <h1>404</h1>,
          children: [
            {
              index: true,
              element: <LandingPage />,
            },
          ],
        },
        {
          path: '/cart',
          element: <Layout />,
          errorElement: <h1>404</h1>,
          children: [
            {
              index: true,
              element: <CartPage />,
            },
          ],
        },
        {
          path: '/checkout',
          element: <Layout />,
          errorElement: <h1>404</h1>,
          children: [
            {
              index: true,
              element: <CheckoutPage />,
            },
            {
              path: 'success',
              element: <CheckoutSuccessPage />,
            },
          ],
        },
        {
          path: '/order',
          element: <Layout />,
          errorElement: <h1>404</h1>,
          children: [
            {
              path: ':id',
              element: <OrderDetailPage />,
            },
          ],
        },
        {
          path: '/profile',
          element: <Layout />,
          errorElement: <h1>404</h1>,
          children: [
            {
              index: true,
              element: <ProfilePage />,
            },
          ],
        },
        {
          path: '/signin',
          element: <Layout />,
          errorElement: <h1>404</h1>,
          children: [
            {
              index: true,
              element: <SigninPage />,
            },
          ],
        },
        {
          path: '/signup',
          element: <Layout />,
          errorElement: <h1>404</h1>,
          children: [
            {
              index: true,
              element: <SignupPage />,
            },
          ],
        },
        {
          path: '/about',
          element: <h1>About</h1>,
          errorElement: <h1>404</h1>,
          children: [],
        },
        {
          path: '/product',
          element: <Layout />,
          errorElement: <h1>404</h1>,
          children: [
            {
              path: ':id',
              element: <ProductPage />,
            },
          ],
        },
        {
          path: '/category',
          element: <Layout />,
          errorElement: <h1>404</h1>,
          children: [
            {
              path: ':id',
              element: <CategoryPage />,
            },
          ],
        },
        {
          path: '/subcategory',
          element: <Layout />,
          errorElement: <h1>404</h1>,
          children: [
            {
              path: ':id',
              element: <SubCategoryPage />,
            },
          ],
        },
      ])}
    />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
