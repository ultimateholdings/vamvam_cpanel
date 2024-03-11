import { RouterProvider } from 'react-router-dom';
import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { router } from './routes';
import '../i18n';
import i18n from '../i18n';
import { useEffect, StrictMode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STORAGE_KEY } from './helper/enums';
import useThemeMode from './hooks/useThemeMode';

import Toast from './components/UI/Toast';
import { fetchUserData } from './store/profile/profile-actions';
import { AppDispatch, RootState } from './store';
import CircularLoader from './components/UI/CircularLoader';
import { getAuthToken } from './helper/utils';

const customTheme = extendTheme(
    {
        colors: {
            brand: {
                100: '#3C50E0'
            }
        }
    },
    withDefaultColorScheme({
        colorScheme: "blue",
        components: ["Button", "Badge"]
    })
);
function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { error, loading, userData } = useSelector(
        (state: RootState) => state.profile,
    );

    useThemeMode();

    useEffect(() => {
        const lng = localStorage.getItem(STORAGE_KEY.lang) ?? navigator.language;
        i18n.changeLanguage(lng);
    }, []);

    useEffect(() => {
        if (!userData && getAuthToken()) {
            dispatch(fetchUserData());
        }
    }, [dispatch, userData]);

    let mainContent = <RouterProvider router={router} />;

    if (loading) {
        mainContent = <CircularLoader />;
    }

    if (error) {
        mainContent = <div>{error.message}</div>;
    }

    return (
        <StrictMode>
            <ChakraProvider theme={customTheme}>
                <Toast />
                {mainContent}
            </ChakraProvider>
        </StrictMode>
    );
}

export default App;
