import { lazy } from 'react';

const Profile = lazy(() => import('../pages/Profile'));

/* mettre les routes protégées ici */
const coreRoutes = [
    {
        path: '/profile',
        title: 'Profile',
        component: Profile,
    },
];

const privateRoutes = [...coreRoutes];
export default privateRoutes;
