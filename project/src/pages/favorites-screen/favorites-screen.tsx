import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { Offers } from '../../types/offer';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type FavoritesScreenProps = {
  offers: Offers;
}

function FavoritesScreen({offers}: FavoritesScreenProps): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList offersData={offers}/>
          </section>
        </div>
      </main>
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
