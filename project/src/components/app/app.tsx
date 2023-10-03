import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import { getAuthCheckedStatus } from '../../store/user-process/selectors';
import {
  getOffers,
  getOffersDataLoadingStatus,
} from '../../store/offers-data/offers-data-selector';

function App(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);

  if (!isAuthChecked || isOffersDataLoading) {
    return <LoadingScreen />;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoute.Root}>
            <Route index element={<MainScreen />} />
            <Route path={AppRoute.Login} element={<LoginScreen />} />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute>
                  <FavoritesScreen offers={offers} />
                </PrivateRoute>
              }
            />
            <Route path={`${AppRoute.Room}/:id`} element={<OfferScreen />} />
          </Route>
          <Route path={AppRoute.NotFoundPage} element={<NotFoundScreen />} />
          <Route path={AppRoute.NotFound} element={<NotFoundScreen />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
