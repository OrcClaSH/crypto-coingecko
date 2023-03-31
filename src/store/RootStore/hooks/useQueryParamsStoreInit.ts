import * as Router from 'react-router-dom';

import rootStore from '../instance';

export const useQueryParamsStoreInit = (): void => {
    const { search } = Router.useLocation();
    // Для работоспособности useLocation необходимо обернуть к примеру в index.tsx в <Router.BrowserRouter>
    // Далее в App.tsx вызвали useQueryParamsStoreInit()
    // https://youtu.be/fIHUzhlg6jc

    rootStore.query.setSearch(search);
};
