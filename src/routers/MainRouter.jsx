import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import GroupDetailPage from '../features/groupsManagement/pages/GroupDetailPage/GroupDetailPage';
import GroupListPage from '../features/groupsManagement/pages/GroupListPage/GroupListPage';
import AuthenticationRoute from '../pages/AuthenticationRoute/AuthenticationRoute';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import GroupOutlet from '../pages/HomePage/GroupOutlet/GroupOutlet';
import HomePage from '../pages/HomePage/HomePage';
import ProfileOutlet from '../pages/HomePage/ProfileOutlet/ProfileOutlet';
import ScheduleOutlet from '../pages/HomePage/ScheduleOutlet/ScheduletOutlet';
import SettingOutlet from '../pages/HomePage/SettingOutlet/SettingOutlet';
import LoginPage from '../pages/LoginPage/LoginPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import TestPage2 from '../pages/TestPage/TestPage2';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticationRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
        children: [
          {
            path: 'schedule',
            element: <ScheduleOutlet />,
          },
          {
            path: 'group',
            element: <GroupOutlet />,
            children: [
              {
                path: '',
                element: <GroupListPage />,
              },
              {
                path: ':groupID',
                element: <GroupDetailPage />,
              },
            ],
          },
          {
            path: 'setting',
            element: <SettingOutlet />,
          },
          {
            path: 'profile',
            element: <ProfileOutlet />,
          },
        ],
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: 'test',
    element: <TestPage2 />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'authentication',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
