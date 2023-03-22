import { API } from '@config/api';
import { ProductModel } from '@store/models/product';
import { Meta } from '@utils/Meta';
import { ILocalStore } from '@utils/useLocalStore';
import axios from 'axios';
import {
  action,
  computed,
  get,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

type PrivateFields = '_product' | '_amount' | '_meta';

export default class BuyNowStore implements ILocalStore {
  private _product: ProductModel | null = null;
  private _meta = Meta.init;
  private _amount: number = 1;

  constructor() {
    makeObservable<BuyNowStore, PrivateFields>(this, {
      _product: observable,
      _meta: observable,
      _amount: observable,
      amount: computed,
      price: computed,
      total: computed,
      product: computed,
      meta: computed,
      incrementAmount: action.bound,
      decrementAmount: action.bound,
      getProduct: action.bound,
    });
  }

  get amount() {
    return this._amount;
  }

  get price() {
    return this._product ? get(this._product, 'price') : 0;
  }

  get total() {
    return this.price * this.amount;
  }

  get product() {
    return this._product;
  }

  get meta() {
    return this._meta;
  }

  incrementAmount() {
    this._amount += 1;
  }

  decrementAmount() {
    if (this._amount > 1) {
      this._amount -= 1;
    }
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
