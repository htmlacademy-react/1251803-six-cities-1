import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import ScrollToTop from '../scroll-to-top/scroll-to-rop';
import PrivateRoute from '../private-route/private-route';
import { Offers } from '../../types/offer';

type AppScreenProps = {
  offers: Offers;
}

function App({offers}: AppScreenProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoute.Root}>
            <Route
              index
              element={<MainScreen offers={offers} />}
            />
            <Route
              path={AppRoute.Login}
              element={<LoginScreen />}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute
                  authorizationStatus={AuthorizationStatus.Auth}
                >
                  <FavoritesScreen offers={offers} />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Room}
              element={<OfferScreen />}
            />
          </Route>
          <Route
            path={AppRoute.NotFound}
            element={<NotFoundScreen />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
