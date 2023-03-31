import ErrorStore from "./ErrorStore/ErrorStore";
import QueryParamsStore from "./QueryParamsStore";

export default class RootStore {
    readonly query = new QueryParamsStore();
    readonly error = new ErrorStore();
};
