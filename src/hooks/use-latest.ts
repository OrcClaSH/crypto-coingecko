import React, { useLayoutEffect, useRef } from 'react';

export const useLatest = (value: any): React.MutableRefObject<any> => {
  const valueRef = useRef(value);

  useLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
};
