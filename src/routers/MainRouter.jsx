import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import HomePage from '../pages/HomePage/HomePage';
import GroupOutlet from '../pages/HomePage/GroupOutlet/GroupOutlet';
import HomeOutlet from '../pages/HomePage/HomeOutlet/HomeOutlet';
import LoginPage from '../pages/LoginPage/LoginPage';
//import TestPage from '../pages/TestPage/TestPage';

const router = createBrowserRouter([
  {
    path: 'home',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'schedule',
        element: <HomeOutlet />,
      },
      {
        path: 'group',
        element: <GroupOutlet />,
      },
    ],
  },
  // {
  //   path: 'test',
  //   element: <TestPage />,
  //   errorElement: <ErrorPage />,
  // },
  {
    path: 'authentication',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
