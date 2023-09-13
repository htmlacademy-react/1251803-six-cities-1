import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import OffersList from '../../components/offers-list/offers-list';
import { Offer, Offers } from '../../types/offer';
import Map from '../../components/map/map';
import { useState } from 'react';
import {useAppSelector} from '../../hooks';
import CitiesList from '../../components/cities-list/cities-list';
import { Cities } from '../../const';
import SortOptionsMenu from '../../components/sort-options-menu/sort-options-menu';

// TODO Как сдеалть скролл наверх при переключении города

function MainScreen (): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(undefined);
  const [selectedSortOption, setSelectedSortOption] = useState<string>('Popular');

  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);

  const onListItemHover = (listItemId: number) => {
    const currentPoint = offers.find((offer) => offer.id === listItemId);

    setSelectedPoint(currentPoint);
  };

  const cangeSortOptionHandle = (option: string) => {
    setSelectedSortOption(option);
  };

  const offersByCity = offers.filter((offer) => offer.city.name === city);

  const sortingOffers = (sortOption: string, offersForSorting: Offers) => {
    switch (sortOption) {
      case 'Popular':
        return offersForSorting;
      case 'Price: low to high':
        return offersForSorting.sort((offerA, offerB) => offerA.price - offerB.price);
      case 'Price: high to low':
        return offersForSorting.sort((offerA, offerB) => offerB.price - offerA.price);
      case 'Top rated first':
        return offersForSorting.sort((offerA, offerB) => offerB.rating - offerA.rating);
      default:
        return offersForSorting;
    }
  };

  const sortOffers = sortingOffers(selectedSortOption, offersByCity);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={Cities} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersByCity.length} places to stay in Amsterdam</b>
              <SortOptionsMenu
                currentSortOption={selectedSortOption}
                onCangeSortOption={cangeSortOptionHandle}
              />
              <OffersList
                offersData={sortOffers}
                onListItemHover={onListItemHover}
              />
            </section>
            <div className="cities__right-section">
              <Map
                offers={offersByCity}
                selectedPoint={selectedPoint}
              />
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}

export default MainScreen;
