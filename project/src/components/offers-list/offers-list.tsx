import {useState} from 'react';
import OfferCard from '../offer-card/offer-card';
import { Offers } from '../../types/offer';
import { Pages } from '../../const';

type OffersListProps = {
  offersData: Offers;
};

function OffersList ({offersData}: OffersListProps): JSX.Element {
  const [, setOfferId] = useState(0);
  const handleMouseOver = (id: number) => {
    setOfferId(id);
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
