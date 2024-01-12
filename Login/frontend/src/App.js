import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Register from './Components/Register';
import Home from './Components/Home';
import Login from './Components/Login';
import Error from './Components/Error';
import WorkshopSelection from './Components/WorkshopSelection'; 

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Home />
        </>
      ),
    },

    {
      path: '/login',
      element: (
        <>
          <Login />
        </>
      ),
    },

    {
      path: '/register',
      element: (
        <>
          <Register />
        </>
      ),
    },

    {
      path: '/registration-form',
      element: (
        <>
          <WorkshopSelection />
        </>
      ),
    },

    {
      path: '/*',
      element: (
        <>
          <Error />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
