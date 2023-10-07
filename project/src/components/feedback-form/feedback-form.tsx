import {useState, ChangeEvent, FormEvent} from 'react';
import { SendComment } from '../../types/send-comment';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendCommentAction } from '../../store/api-actions';
import { getReviewsDataLoadingStatus } from '../../store/offers-data/offers-data-selector';

type FeedbackFormProps = {
  offerId: string;
}

function FeedbackForm ({offerId}: FeedbackFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isReviewsDataLoading = useAppSelector(getReviewsDataLoadingStatus);

  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState('');

  let isDisabledButton = true;
  let isValidData = false;

  if (50 <= feedbackText.length && feedbackText.length <= 300 && rating) {
    isDisabledButton = false;
    isValidData = true;
  }

  if (isReviewsDataLoading) {
    isDisabledButton = true;
    isValidData = false;
  }

  const handleFieldChange = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    const value = target.value;
    setFeedbackText(value);
  };

  const handleChangeRatingValue = ({target}: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setRating(value);
  };

  const onSubmit = (authData: SendComment) => {
    dispatch(sendCommentAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isValidData) {
      onSubmit({
        hotelId: offerId,
        rating: rating,
        comment: feedbackText,
      });

      setRating('');
      setFeedbackText('');
    }
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          checked={rating === '5'}
          value={'5'}
          id="5-stars"
          type="radio"
          onChange={handleChangeRatingValue}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          checked={rating === '4'}
          value={'4'}
          id="4-stars"
          type="radio"
          onChange={handleChangeRatingValue}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          checked={rating === '3'}
          value={'3'}
          id="3-stars"
          type="radio"
          onChange={handleChangeRatingValue}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          checked={rating === '2'}
          value={'2'}
          id="2-stars"
          type="radio"
          onChange={handleChangeRatingValue}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          checked={rating === '1'}
          value={'1'}
          id="1-star"
          type="radio"
          onChange={handleChangeRatingValue}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={feedbackText}
        onChange={handleFieldChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabledButton}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default FeedbackForm;
