import { RouteObject } from 'react-router-dom';
import { registrationLoader } from '../api/auth/loader';

const registrationRoute: RouteObject = {
  path: 'registration',
  loader: registrationLoader,
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

export default registrationRoute;
