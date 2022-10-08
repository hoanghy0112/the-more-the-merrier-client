import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import GroupPage from '../pages/GroupPage/GroupPape';
import HomePage from '../pages/HomePage/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'group/',
        element: <GroupPage />,
      },
    ],
  },
]);

export default router;
