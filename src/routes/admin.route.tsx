import { RouteObject } from 'react-router-dom';
import { adminLoader } from '../api/auth/loader';
import HomePage from '../pages/admin/Home';

const adminRoute: RouteObject = {
  path: 'admin',
  loader: adminLoader,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: 'users',
    },
    {
      path: 'sponsors',
    },
    {
      path: 'deliveries',
    },
    {
      path: 'recharges',
    },
    {
      path: 'subscriptions',
    },
  ],
};

export default adminRoute;
