import { lazy } from 'react';

const Profile = lazy(() => import('../pages/Profile'));
const UserList = lazy(() => import('../modules/usersModule/pages/UserList'));

/* mettre les routes protégées ici */
const coreRoutes = [
    {
        path: '/profile',
        title: 'Profile',
        component: Profile,
    },
    {
        path: '/users',
        title: 'Users - List',
        component: UserList,
    },
];

const privateRoutes = [...coreRoutes];
export default privateRoutes;
