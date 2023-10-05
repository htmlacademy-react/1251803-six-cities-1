import Logo from '../logo/logo';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import { MouseEvent } from 'react';
import { getAuthorizationStatus, getUserData } from '../../store/user-process/selectors';
import { getFavoriteOffers } from '../../store/favorite-data/favorite-data-selector';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const userData = useAppSelector(getUserData);
  const dispatch = useAppDispatch();

  const handleLogout = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    dispatch(logoutAction());
  };

  const email = userData?.email ?? 'lazarev@gmail.com';

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Logo />
          </div>
          <nav className='header__nav'>
            <ul className='header__nav-list'>
              {authorizationStatus === AuthorizationStatus.Auth ? (
                <>
                  <li className='header__nav-item user'>
                    <Link
                      className='header__nav-link header__nav-link--profile'
                      to={AppRoute.Favorites}
                    >
                      <div className='header__avatar-wrapper user__avatar-wrapper' />
                      <span className='header__user-name user__name'>
                        {email}
                      </span>
                      <span className='header__favorite-count'>{favoriteOffers.length}</span>
                    </Link>
                  </li>
                  <li className='header__nav-item'>
                    <a
                      className='header__nav-link'
                      href='#a'
                      onClick={handleLogout}
                    >
                      <span className='header__signout'>Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className='header__nav-item user'>
                  <Link
                    className='header__nav-link header__nav-link--profile'
                    to={AppRoute.Login}
                  >
                    <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                    <span className='header__login'>Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
