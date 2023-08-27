import { Reviews } from '../../types/reviews';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  reviews: Reviews;
};

function ReviewsList ({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => {
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
