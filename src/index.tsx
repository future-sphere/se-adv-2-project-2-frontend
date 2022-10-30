import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        {
          path: '/',
          element: <LandingPage />,
          errorElement: <h1>404</h1>,
          children: [
            {
              index: true,
              element: <h1>Index</h1>,
            },
          ],
        },
        {
          path: '/about',
          element: <h1>About</h1>,
          errorElement: <h1>404</h1>,
          children: [],
        },
      ])}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
