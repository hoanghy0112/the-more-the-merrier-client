import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import HomePage from '../pages/HomePage/HomePage';
import GroupOutlet from '../pages/HomePage/GroupOutlet/GroupOutlet';
import ScheduleOutlet from '../pages/HomePage/ScheduleOutlet/ScheduletOutlet';
import LoginPage from '../pages/LoginPage/LoginPage';
import TestPage from '../pages/TestPage/TestPage';
import SettingOutlet from '../pages/HomePage/SettingOutlet/SettingOutlet';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TestPage />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'schedule',
            element: <ScheduleOutlet />,
          },
          {
            path: 'group',
            element: <GroupOutlet />,
          },
          {
            path: 'setting',
            element: <SettingOutlet />,
          },
        ],
      },
    ],
  },
  {
    path: 'test',
    element: <TestPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'authentication',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
