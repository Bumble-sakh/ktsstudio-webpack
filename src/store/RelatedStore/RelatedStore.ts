import { API } from '@config/api';
import { ProductModel } from '@store/models/product';
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

type PrivateFields = '_related' | '_meta';

export default class RelatedStore implements ILocalStore {
  private _meta = Meta.init;
  private _related: ProductModel[] = [];

  constructor() {
    makeObservable<RelatedStore, PrivateFields>(this, {
      _related: observable.ref,
      _meta: observable,
      related: computed,
      meta: computed,
      getRelated: action.bound,
    });
  }

  get related() {
    return this._related;
  }

  get meta() {
    return this._meta;
  }

  async getRelated(id: string): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;
    this._related = [];

    const response = await axios({
      method: API.METHOD.get,
      baseURL: API.BASE_URL,
      url: API.ENDPOINT.products,
      params: {
        categoryId: id,
        offset: 0,
        limit: 6,
      },
    });

    runInAction(() => {
      if (response.status === 200) {
        this._related = response.data;
        this._meta = Meta.success;
        return;
      }

      this._meta = Meta.error;
    });
  }

  destroy(): void {}
}
