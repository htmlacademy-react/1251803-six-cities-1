import { RefObject, useEffect, useRef } from 'react';

// TODO пришлось передавать ещё один реф для кнопки. Можно ли как-то перенести логику с исключение кнопки с сам компонент SortOptions

function useOutsideClick (
  ref: RefObject<HTMLElement | null>,
  refBtn: RefObject<HTMLElement | null>,
  callback: (event: Event) => void
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler: EventListener = (event) => {
      const { current: target } = ref;
      const { current: targetBtn } = refBtn;
      if (
        target &&
        !target.contains(event.target as HTMLElement) &&
        targetBtn &&
        !targetBtn.contains(event.target as HTMLElement)
      ) {
        callbackRef.current(event);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [ref, refBtn]);
}

export default useOutsideClick;
