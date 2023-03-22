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

type PrivateFields = '_product' | '_meta';

export default class ProductStore implements ILocalStore {
  private _meta = Meta.init;
  private _product: ProductModel | null = null;
  private static _instance: ProductStore = new ProductStore();

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable.ref,
      _meta: observable,
      product: computed,
      meta: computed,
      getProduct: action.bound,
    });
  }

  get product() {
    return this._product;
  }

  get meta() {
    return this._meta;
  }

  async getProduct(id: string): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    const response = await axios({
      method: API.METHOD.get,
      baseURL: API.BASE_URL,
      url: `${API.ENDPOINT.products}/${id}`,
    });

    runInAction(() => {
      if (response.status === 200) {
        this._product = response.data;
        this._meta = Meta.success;
        return;
      }

      this._meta = Meta.error;
    });
  }

  destroy(): void {}
}
