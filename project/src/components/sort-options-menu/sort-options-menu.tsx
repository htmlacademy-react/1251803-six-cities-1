import { useRef, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import { SortOptions } from '../../const';

type SortOptionsMenuProps = {
  currentSortOption: string;
  onCangeSortOption: (option: string) => void;
};

function SortOptionsMenu ({currentSortOption, onCangeSortOption}: SortOptionsMenuProps): JSX.Element {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const optionsListRef = useRef(null);
  const sortingBtnRef = useRef(null);

  const onSortingBtnClickHandle = () => {
    setIsOpened(!isOpened);
  };
  const onOutSideClickHandle = () => {
    setIsOpened(false);
  };
  useOutsideClick(optionsListRef, sortingBtnRef, onOutSideClickHandle);

  const onSortOptionClickHandle = (option: string) => {
    onCangeSortOption(option);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={onSortingBtnClickHandle}
        ref={sortingBtnRef}
      >
        {currentSortOption}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}
        ref={optionsListRef}
      >
        {SortOptions.map((option) => {
          const isActive = (option === currentSortOption) ? 'places__option--active' : '';
          return (
            <li
              key={option}
              className={`places__option ${isActive}`}
              tabIndex={0}
              onClick={() => {onSortOptionClickHandle(option);}}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </form>
  );
}

export default SortOptionsMenu;
