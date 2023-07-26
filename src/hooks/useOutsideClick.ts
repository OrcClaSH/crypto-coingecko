import React, { useEffect, useRef, useState } from 'react';

export const useOutsideClick = (
  initialIsVisible: boolean,
): {
  ref: React.MutableRefObject<HTMLUListElement | null>;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
} => {
  const [isShow, setIsShow] = useState(initialIsVisible);
  const ref = useRef<HTMLUListElement | null>(null);

  const handleClickOutside = (event: MouseEvent): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref, isShow, setIsShow };
};
