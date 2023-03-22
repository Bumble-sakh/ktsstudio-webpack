import { ProductModel } from '@store/models/product';
import { ILocalStore } from '@utils/useLocalStore';
import {
  action,
  computed,
  makeObservable,
  observable,
  remove,
  set,
  toJS,
} from 'mobx';

type Entity = {
  product: ProductModel;
  amount: number;
};

type PrivateFields = '_currentProduct' | '_order' | '_entities';

export default class CartStore implements ILocalStore {
  private _order: number[] = [];
  private _entities: Record<number, Entity> = {};
  private _currentProduct: number | null = null;

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _order: observable,
      _entities: observable,
      _currentProduct: observable,
      entities: computed,
      productsAmount: computed,
      productAmount: computed,
      currentProduct: computed,
      totalPrice: computed,
      isEmpty: computed,
      addToCart: action.bound,
      removeFromCart: action.bound,
    });
  }

  get order() {
    return this._order;
  }

  set order(value) {
    this._order = value;
  }

  get productsAmount() {
    return this._order.length;
  }

  get currentProduct(): number | null {
    return this._currentProduct;
  }

  set currentProduct(id: number | null) {
    this._currentProduct = id;
  }

  get entities() {
    return this._entities;
  }

  get productAmount(): number | null {
    return this._currentProduct
      ? toJS(this._entities)[this._currentProduct]?.amount
      : null;
  }

  get totalPrice() {
    return this._order.reduce((acc, id) => {
      acc += this._entities[id].amount * this._entities[id].product.price;
      return acc;
    }, 0);
  }

  get isEmpty() {
    return this._order.length === 0;
  }

  addToCart(product: ProductModel) {
    const { id } = product;

    if (!this._order.includes(id)) {
      set(this._order, this._order.length, id);
      set(this._entities, id, { amount: 1, product });
    } else {
      set(this._entities, id, {
        amount: this._entities[id].amount + 1,
        product,
      });
    }
  }

  removeFromCart(product: ProductModel) {
    const { id } = product;
    const index = this._order.indexOf(id);

    if (index !== -1) {
      const amount = this._entities[id].amount - 1;

      set(this._entities[id], { amount });

      if (amount <= 0) {
        remove(this._order, String(index));
        remove(this._entities, String(id));
      }
    }
  }

  destroy(): void {}
}
