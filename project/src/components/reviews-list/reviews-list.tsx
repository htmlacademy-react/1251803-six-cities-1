import { Reviews } from '../../types/reviews';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  reviews: Reviews;
};

function ReviewsList ({reviews}: ReviewsListProps): JSX.Element {
  const tenLastReviews = [...reviews].reverse().slice(0, 10);

  return (
    <ul className="reviews__list">
      {tenLastReviews.map((review) => {
        const currentReview = review;
        return (
          <ReviewItem
            key={currentReview.id}
            review={currentReview}
          />
        );
      })}
    </ul>
  );
}

export default ReviewsList;
