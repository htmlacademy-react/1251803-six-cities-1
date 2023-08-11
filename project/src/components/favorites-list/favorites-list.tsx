import OfferCard from '../offer-card/offer-card';
import { Offers } from '../../types/offer';
import { Pages } from '../../const';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type OfferCardProps = {
  offersData: Offers;
};

function FavoritesList ({offersData}: OfferCardProps): JSX.Element {
  const favorites = offersData.filter((offer) => offer.isFavorite === true);
  const locations = favorites.map((offer) => offer.city.name);
  const uniqueLocations = Array.from(new Set(locations));

  return (
    <ul className="favorites__list">
      {uniqueLocations.map((location) => {
        const keyValue = `${location}`;
        const localOffers = favorites.filter((offer) => offer.city.name === location);
        return (
          <li key={keyValue} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to={AppRoute.Root}>
                  <span>{location}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {localOffers.map((offer) => {
                const currentOffer = offer;
                return (
                  <OfferCard
                    key={currentOffer.id}
                    offerData={currentOffer}
                    page={Pages.Favorites}
                  />
                );
              })}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default FavoritesList;
