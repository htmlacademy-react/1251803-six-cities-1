import { Helmet } from 'react-helmet-async';
import { useParams, Navigate } from 'react-router-dom';

import Header from '../../components/header/header';
import FeedbackForm from '../../components/feedback-form/feedback-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import { FavoriteStatusType } from '../../types/favorite-status-type';

import {
  AppRoute,
  AuthorizationStatus } from '../../const';
import { MouseEvent, useEffect, useState } from 'react';
import { Offer } from '../../types/offer';
import {
  changeFavoriteStatus,
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchReviewsAction
} from '../../store/api-actions';
import { useAppSelector, useAppDispatch } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import {
  getCurrentOffer,
  getCurrentOfferDataLoadingStatus,
  getNearbyOffers,
  getNearbyOffersDataLoadingStatus,
  getReviews,
  getErrorStatus,
} from '../../store/offers-data/offers-data-selector';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { redirectToRoute } from '../../store/action';

function OfferScreen(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchOfferAction(params.id));
      dispatch(fetchNearbyOffersAction(params.id));
      dispatch(fetchReviewsAction(params.id));
    }
  }, [params.id, dispatch]);

  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(undefined);

  const isOfferDataLoading = useAppSelector(getCurrentOfferDataLoadingStatus);
  const isNearbyOffersDataLoading = useAppSelector(getNearbyOffersDataLoadingStatus);
  const currentOffer = useAppSelector(getCurrentOffer);
  const offersNearby = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getReviews);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const hasError = useAppSelector(getErrorStatus);

  if (isOfferDataLoading || isNearbyOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (hasError) {
    return <Navigate to={AppRoute.NotFoundPage} />;
  }

  if (!currentOffer) {
    return (
      <LoadingScreen />
    );
  }

  const onListItemHover = (listItemId: number) => {
    const currentPoint = offersNearby.find((offer) => offer.id === listItemId);

    setSelectedPoint(currentPoint);
  };

  const isFavorite = currentOffer.isFavorite ? 'property__bookmark-button--active' : '';

  const onAuthStatusClick = (pathParams: FavoriteStatusType) => {
    dispatch(changeFavoriteStatus(pathParams));
  };

  const favoriteStatus = !currentOffer.isFavorite ? 1 : 0;

  const onBookmarkClickHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (authorizationStatus === AuthorizationStatus.Auth) {
      onAuthStatusClick({
        hotelId: currentOffer.id,
        status: favoriteStatus,
      });
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

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
                <button
                  className={`${isFavorite} property__bookmark-button button`}
                  type="button"
                  onClick={onBookmarkClickHandler}
                >
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
                <ReviewsList reviews={reviews}/>
                {(authorizationStatus === AuthorizationStatus.Auth && params.id) ? <FeedbackForm offerId={params.id} /> : null}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              currentOffer={currentOffer}
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
