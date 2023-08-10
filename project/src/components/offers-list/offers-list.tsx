import {useState} from 'react';
import OfferCard from '../offer-card/offer-card';
import { Offers } from '../../types/offer';
import { Pages } from '../../const';

type OfferCardProps = {
  offersData: Offers;
};

function OffersList ({offersData}: OfferCardProps): JSX.Element {
  const [, setOfferId] = useState(0);
  const handleMouseOver = (id: number) => {
    setOfferId(id);
  };

  return (
    // Вопрос про возврат!!
    // Вопрос про ключ!!
    // Вопрос про .env!!
    <>
      {offersData.map((offer) => {
        const currentOffer = offer;
        return (
          <OfferCard
            key={currentOffer.id}
            id={currentOffer.id}
            offerData={currentOffer}
            page={Pages.Main}
            onMouseOver={handleMouseOver}
          />
        );
      })}
    </>
  );
}

export default OffersList;
