import { Offer } from '../../types/offer';
import { Pages } from '../../const';
import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppRoute, AuthorizationStatus, ImageDimensions } from '../../const';
import { redirectToRoute } from '../../store/action';
import { changeFavoriteStatus } from '../../store/api-actions';
import { FavoriteStatusType } from '../../types/favorite-status-type';

type OfferCardProps = {
  offerData: Offer;
  page: string;
  onMouseOver?: (key: number) => void;
};

function OfferCard ({offerData, page, onMouseOver}: OfferCardProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  const isMark = offerData.isFavorite ? 'place-card__bookmark-button--active' : '';
  const handleMouseOver = () => {
    if (onMouseOver) {
      onMouseOver(offerData.id);
    }
  };

  const getImgSizeByPage = (pageName: string) => {
    const imgSize = {
      width: ImageDimensions.bigImg.width,
      height: ImageDimensions.bigImg.height,
    };

    switch(pageName) {
      case Pages.Main:
        imgSize.width = ImageDimensions.bigImg.width;
        imgSize.height = ImageDimensions.bigImg.height;
        break;

      case Pages.Favorites:
        imgSize.width = ImageDimensions.smallImg.width;
        imgSize.height = ImageDimensions.smallImg.height;
        break;
    }

    return imgSize;
  };

  const imgSize = getImgSizeByPage(page);

  const onAuthStatusClick = (pathParams: FavoriteStatusType) => {
    dispatch(changeFavoriteStatus(pathParams));
  };

  const favoriteStatus = !offerData.isFavorite ? 1 : 0;

  const handleOnBookmarkClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (authorizationStatus === AuthorizationStatus.Auth) {
      onAuthStatusClick({
        hotelId: offerData.id,
        status: favoriteStatus,
      });
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  return (
    <article
      className={`${page}__card place-card`}
      onMouseOver={handleMouseOver}
    >
      {offerData.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${page}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Room}/${offerData.id}`}>
          <img
            className="place-card__image"
            src={offerData.previewImage}
            width={imgSize.width}
            height={imgSize.height}
            alt=""
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offerData.price} </b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`${isMark} place-card__bookmark-button button`}
            type="button"
            onClick={handleOnBookmarkClick}
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offerData.rating * 20}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${offerData.id}`}>
            {offerData.title}
          </Link>
        </h2>
        <p className="place-card__type">{offerData.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
