import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import browserHistory from '../../browser-history';
import HistoryRouter from '../history-router/history-router';
import PrivateRoute from '../private-route/private-route';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';

import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

import { getAuthCheckedStatus, getAuthorizationLoadingStatus } from '../../store/user-process/selectors';
import { getOffersDataLoadingStatus, getErrorStatus } from '../../store/offers-data/offers-data-selector';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { useEffect } from 'react';
import useScrollToTop from '../../hooks/useScrollToTop';

function App(): JSX.Element {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const isAuthorizationLoading = useAppSelector(getAuthorizationLoadingStatus);
  const isHasError = useAppSelector(getErrorStatus);
  const dispatch = useAppDispatch();

  useScrollToTop();

  useEffect(() => {
    if (isAuthChecked) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [isAuthChecked, dispatch]);

  if (isAuthorizationLoading || isOffersDataLoading) {
    return <LoadingScreen />;
  }

  if (isHasError) {
    return <div>Сервер не доступен</div>;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
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
