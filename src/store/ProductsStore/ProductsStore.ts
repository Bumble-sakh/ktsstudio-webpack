import { API } from '@config/api';
import { normalizeProduct, ProductModel } from '@store/models/product';
import rootStore from '@store/RootStore/instance';
import { Meta } from '@utils/Meta';
import { ILocalStore } from '@utils/useLocalStore';
import axios from 'axios';
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx';

type getProductsParams = {
  search?: string | null;
  categoryId?: string | null;
};

type PrivateFields = '_products' | '_meta' | '_search' | '_categoryId';

export default class ProductsStore implements ILocalStore {
  private _products: ProductModel[] = [];
  private _meta: Meta = Meta.init;
  private _search: string | null = null;
  private _categoryId: string | null = null;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable.ref,
      _meta: observable,
      _search: observable,
      _categoryId: observable,
      products: computed,
      meta: computed,
      totalProducts: computed,
      getProducts: action.bound,
    });
  }

  get products() {
    return this._products;
  }

  get meta() {
    return this._meta;
  }

  get totalProducts() {
    return this._products.length;
  }

  async getProducts(
    { categoryId, search }: getProductsParams = {
      categoryId: null,
      search: null,
    }
  ): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;
    this._products = [];

    const response = await axios({
      method: API.METHOD.get,
      baseURL: API.BASE_URL,
      url: API.ENDPOINT.products,
      params: {
        categoryId: categoryId ? Number(categoryId) : null,
        title: search,
      },
    });

    runInAction(() => {
      if (response.status === 200) {
        this._meta = Meta.success;
        this._products = response.data.map(normalizeProduct);
        return;
      }

      this._meta = Meta.error;
      this._products = [];
    });
  }

  destroy(): void {}

  private readonly _qpSearchReaction: IReactionDisposer = reaction(
    () => rootStore.queryParamsStore.getParam('search'),
    (search) => {
      this._search = search ?? null;
      this.getProducts({ categoryId: this._categoryId, search });
    }
  );

  private readonly _qpCategoryIdReaction: IReactionDisposer = reaction(
    () => rootStore.queryParamsStore.getParam('categoryId'),
    (categoryId) => {
      this._categoryId = categoryId ?? null;
      this.getProducts({ categoryId, search: this._search });
    }
  );
}
