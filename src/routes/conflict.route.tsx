import { RouteObject } from 'react-router-dom';
import { conflictLoader } from '../api/auth/loader';

const conflictRoute: RouteObject = {
  path: 'conflict',
  loader: conflictLoader,
  children: [
    {
      index: true,
      // element: <HomePage />
    },
    {
      path: 'users',
    },
  ],
};

export default conflictRoute;
