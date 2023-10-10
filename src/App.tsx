import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ECommerce from './pages/Dashboard/ECommerce';
import Loader from './common/Loader';
import routes from './routes';
import PrivateRoute from './routes/PrivateRoute';
import privateRoutes from './routes/private';
import SignIn from './modules/authModule/pages/Authentication/SignIn';
import '../i18n'
import i18n from '../i18n';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  //default language change hook
  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);



  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster position='top-right' reverseOrder={false} containerClassName='overflow-auto' />
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route element={<DefaultLayout />}>
          <Route
            path="/"
            element={
              <PrivateRoute />
            }
          >
            {privateRoutes.map(({ path, component: Component }) => (
              <Route
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            ))}
          </Route>
          <Route index element={<ECommerce />} />
          {routes.map(({ path, component: Component }) => (
            <Route
              path={path}
              element={
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
