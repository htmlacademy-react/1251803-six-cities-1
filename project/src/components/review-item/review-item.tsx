import { Review } from '../../types/reviews';

type ReviewProps = {
  review: Review;
};

function ReviewItem ({review}: ReviewProps): JSX.Element {
  const date = new Date(review.date);
  const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const dateTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${review.rating * 20}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={dateTime}>
          {monthYear}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
