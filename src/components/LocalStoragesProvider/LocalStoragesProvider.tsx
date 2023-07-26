import React from 'react';

import localStores, { localStoresContext } from '@/store';

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <localStoresContext.Provider value={localStores}>
      {children}
    </localStoresContext.Provider>
  );
};
