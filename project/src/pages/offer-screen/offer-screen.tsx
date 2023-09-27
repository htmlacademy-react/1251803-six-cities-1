import { Helmet } from 'react-helmet-async';
import { useParams, Navigate } from 'react-router-dom';

import Header from '../../components/header/header';
import FeedbackForm from '../../components/feedback-form/feedback-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';

import { AppRoute } from '../../const';
import { reviews } from '../../mocks/reviews';
import { offersNearby } from '../../mocks/offers-nearby';
import { useEffect, useState } from 'react';
import { Offer } from '../../types/offer';
import { fetchOfferAction } from '../../store/api-actions';
import { useAppSelector, useAppDispatch } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';

function OfferScreen(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchOfferAction(params.id));
    }
  }, [params.id, dispatch]);

  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(undefined);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const currentOffer = useAppSelector((state) => state.currentOffer);

  if (isOffersDataLoading || !currentOffer) {
    return (
      <LoadingScreen />
    );
  }

  if (!currentOffer) {
    return <Navigate to={AppRoute.NotFoundPage} />;
  }

  const onListItemHover = (listItemId: number) => {
    const currentPoint = offersNearby.find((offer) => offer.id === listItemId);

    setSelectedPoint(currentPoint);
  };

  const isFavorite = currentOffer.isFavorite ? 'property__bookmark-button--active' : '';

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: property</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {currentOffer.images.map((img, id) => {
                const keyValue = `${id}-${img}`;
                return (
                  <div key={keyValue} className="property__image-wrapper">
                    <img
                      className="property__image"
                      src={img}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {currentOffer.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentOffer.title}
                </h1>
                <button className={`${isFavorite} property__bookmark-button button`} type="button">
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${currentOffer.rating * 20}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{currentOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {currentOffer.goods.map((good, id) => {
                    const keyValue = `${id}-${good}`;
                    return (
                      <li key={keyValue} className="property__inside-item">{good}</li>
                    );
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{currentOffer.host.name}</span>
                  {currentOffer.host.isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewsList
                  reviews={reviews}
                />
                <FeedbackForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              offers={offersNearby}
              selectedPoint={selectedPoint}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OffersList
                offersData={offersNearby}
                onListItemHover={onListItemHover}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
