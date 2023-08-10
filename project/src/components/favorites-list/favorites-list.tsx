import OfferCard from '../offer-card/offer-card';
import { Offers } from '../../types/offer';
import { Pages } from '../../const';

type OfferCardProps = {
  offersData: Offers;
};

function FavoritesList ({offersData}: OfferCardProps): JSX.Element {
  const favorites = offersData.filter((offer) => offer.isMark === true);
  // Здесь вылетает ошибка с any!!
  // eslint-disable-next-line
  const locations = favorites.map((offer) => offer.location);
  const uniqueLocations = Array.from(new Set(locations));

  return (
    <ul className="favorites__list">
      {uniqueLocations.map((location, id) => {
        // Почему нельзя использовать id в key!!
        // Здесь вылетает ошибка с any!!
        // eslint-disable-next-line
        const keyValue = `${id}-${location}`;
        const localOffers = favorites.filter((offer) => offer.location === location);
        return (
          <li key={keyValue} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#a">
                  <span>{location}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {localOffers.map((offer) => {
                const currentOffer = offer;
                return (
                  <OfferCard
                    key={currentOffer.id}
                    id={currentOffer.id}
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
