import AppStatusStore from './AppStatusStore/AppStatusStore';
import QueryParamsStore from './QueryParamsStore';

export default class RootStore {
  readonly query = new QueryParamsStore();

  readonly status = new AppStatusStore();
}
