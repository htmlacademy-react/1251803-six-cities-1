import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import browserHistory from '../../browser-history';
import HistoryRouter from '../history-router/history-router';
import PrivateRoute from '../private-route/private-route';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

import { getAuthCheckedStatus, getAuthorizationLoadingStatus } from '../../store/user-process/selectors';
import { getOffersDataLoadingStatus } from '../../store/offers-data/offers-data-selector';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { useEffect } from 'react';
function App(): JSX.Element {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const isAuthorizationLoading = useAppSelector(getAuthorizationLoadingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthChecked) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [isAuthChecked, dispatch]);

  if (isAuthorizationLoading || isOffersDataLoading) {
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
                  <FavoritesScreen />
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
