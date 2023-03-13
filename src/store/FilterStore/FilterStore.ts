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

type PrivateFields = '_categoryId' | '_optionsIsVisible';

export default class FilterStore implements ILocalStore {
  private _categoryId: number | null = null;
  private _optionsIsVisible: boolean = false;

  constructor() {
    makeObservable<FilterStore, PrivateFields>(this, {
      _categoryId: observable,
      _optionsIsVisible: observable,
      categoryId: computed,
      optionsIsVisible: computed,
      setCategoryId: action.bound,
      toggleOptionsIsVisible: action.bound,
    });
  }

  get categoryId() {
    return this._categoryId;
  }

  get optionsIsVisible() {
    return this._optionsIsVisible;
  }

  setCategoryId(id: number) {
    this._categoryId = id;
  }

  toggleOptionsIsVisible() {
    this._optionsIsVisible = !this._optionsIsVisible;
  }

  destroy(): void {}

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.queryParamsStore.getParam('categoryId'),
    (id) => {
      id && this.setCategoryId(Number(id));
    }
  );
}
