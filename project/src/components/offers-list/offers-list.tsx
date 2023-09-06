import OfferCard from '../offer-card/offer-card';
import { Offers } from '../../types/offer';
import { Pages } from '../../const';

type OffersListProps = {
  offersData: Offers;
  onListItemHover: (listItemId: number) => void;
};

function OffersList ({offersData, onListItemHover}: OffersListProps): JSX.Element {
  const handleMouseOver = (id: number) => {
    onListItemHover(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersData.map((offer) => {
        const currentOffer = offer;
        return (
          <OfferCard
            key={currentOffer.id}
            offerData={currentOffer}
            page={Pages.Main}
            onMouseOver={handleMouseOver}
          />
        );
      })}
    </div>
  );
}

export default OffersList;
