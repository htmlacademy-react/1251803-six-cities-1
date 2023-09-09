import { CitiesNames } from '../../types/cities';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action';

type CitiesListProps = {
  cities: CitiesNames;
};

function CitiesList ({cities}: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state) => state.city);

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => {
        const onClickHandle = () => {
          dispatch(changeCity(city));
        };

        const isActive = (city === activeCity) ? 'tabs__item--active' : '';
        return (
          <li key={city} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${isActive}`}
              href={`#${city}`}
              onClick={onClickHandle}
            >
              <span>{city}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default CitiesList;
