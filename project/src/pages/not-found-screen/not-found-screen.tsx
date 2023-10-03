import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch } from '../../hooks';
import { resetErrorStatus } from '../../store/offers-data/offers-data';

function NotFoundScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const onClickHandle = () => {
    dispatch(resetErrorStatus());
  };

  return (
    <>
      <Helmet>
        <title>6 cities: 404</title>
      </Helmet>
      <h1>404. Page not found</h1>
      <Link
        to={AppRoute.Root}
        onClick={onClickHandle}
      >
        Вернуться на главную
      </Link>
    </>

  );
}

export default NotFoundScreen;
