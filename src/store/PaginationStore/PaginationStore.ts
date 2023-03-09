import PAGINATION from '@config/pagination';
import rootStore from '@store/RootStore/instance';
import { ILocalStore } from '@utils/useLocalStore';
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
} from 'mobx';

type PrivateFields = '_paginationPage' | '_limit' | '_offset' | '_total';

export default class PaginationStore implements ILocalStore {
  private _paginationPage: number = 1;
  private _limit: number = PAGINATION.limit;
  private _total: number = 0;
  private _offset: number = (this._paginationPage - 1) * this._limit;

  constructor() {
    makeObservable<PaginationStore, PrivateFields>(this, {
      _paginationPage: observable,
      _limit: observable,
      _total: observable,
      _offset: observable,
      paginationPage: computed,
      limit: computed,
      total: computed,
      offset: computed,
      isVisible: computed,

      setPaginationPage: action,
      setTotal: action,
    });
  }

  get paginationPage() {
    return this._paginationPage;
  }

  get limit() {
    return this._limit;
  }

  get total() {
    return this._total;
  }

  get offset() {
    return (this.paginationPage - 1) * this.limit;
  }

  get isVisible() {
    return this.total > this.limit;
  }

  setTotal(total: number): void {
    this._total = total;
  }

  setPaginationPage(page: number): void {
    this._paginationPage = page;
  }

  destroy() {}

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('page'),
    (page) => {
      if (page) {
        this.setPaginationPage(+page);
      } else {
        this.setPaginationPage(1);
      }
    }
  );
}
