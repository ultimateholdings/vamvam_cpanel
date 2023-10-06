import { lazy } from 'react';

const Profile = lazy(() => import('../pages/Profile'));


const coreRoutes = [
    {
        path: '/profile',
        title: 'Profile',
        component: Profile,
    },
];

const privateRoutes = [...coreRoutes];
export default privateRoutes;
