import QueryParamsStore from '@store/RootStore/QueryPramsStore';

export default class RootStore {
  readonly query = new QueryParamsStore();
}
