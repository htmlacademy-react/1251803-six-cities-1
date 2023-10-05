import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteOffers } from '../../store/favorite-data/favorite-data-selector';
import FavoriteEmpty from '../../components/favorite-empty/favorite-empty';
import { useEffect } from 'react';
import { fetchFavoriteOffersAction } from '../../store/api-actions';

function FavoritesScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const isEmpty = favoriteOffers.toString() === [].toString();
  const emptyPageClass = isEmpty ? 'page--favorites-empty' : '';

  return (
    <div className={`${emptyPageClass} page`}>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <Header />
      {
        (isEmpty) ?
          <FavoriteEmpty /> :
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <FavoritesList offersData={favoriteOffers}/>
              </section>
            </div>
          </main>
      }
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
