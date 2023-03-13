import { API } from '@config/api';
import { CategoryModel } from '@store/models/category';
import { Meta } from '@utils/Meta';
import { ILocalStore } from '@utils/useLocalStore';
import axios from 'axios';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

type PrivateFields = '_categories' | '_meta';

export default class CategoriesStore implements ILocalStore {
  private _meta = Meta.init;
  private _categories: CategoryModel[] = [];

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _categories: observable.ref,
      _meta: observable,
      categories: computed,
      meta: computed,
      totalCategories: computed,
      getCategories: action.bound,
    });
  }

  get categories() {
    return this._categories;
  }

  get meta() {
    return this._meta;
  }

  get totalCategories() {
    return this._categories.length;
  }

  async getCategories(): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    const response = await axios({
      method: API.METHOD.get,
      baseURL: API.BASE_URL,
      url: API.ENDPOINT.categories,
    });

    runInAction(() => {
      if (response.status === 200) {
        this._categories = response.data;
        this._meta = Meta.success;
        return;
      }

      this._meta = Meta.error;
    });
  }

  destroy(): void {}
}
