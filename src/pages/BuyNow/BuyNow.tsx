import { createContext, useEffect } from 'react';

import Loader, { LoaderSize } from '@components/Loader';
import BuyNowStore from '@store/BuyNowStore';
import { Meta } from '@utils/Meta';
import { useLocalStore } from '@utils/useLocalStore';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import styles from './BuyNow.module.scss';
import ProductCard from './ProductCard';
import Total from './Total';

type DefaultBuyNowPageContextType = {
  buyNowStore: BuyNowStore;
};

export const BuyNowPageContext = createContext(
  {} as DefaultBuyNowPageContextType
);

const BuyNow = () => {
  const { id } = useParams();

  const buyNowStore = useLocalStore(() => new BuyNowStore());

  const defaultProductsPageContext = {
    buyNowStore,
  };

  useEffect(() => {
    id && buyNowStore.getProduct(id);
  }, [buyNowStore, id]);

  return (
    <BuyNowPageContext.Provider value={defaultProductsPageContext}>
      <section className={styles.section}>
        <div className={`${styles.section__wrapper} wrapper`}>
          <h1 className={styles.title}>Buy now</h1>
          {buyNowStore.meta === Meta.loading && <Loader size={LoaderSize.l} />}

          {buyNowStore.product && <ProductCard product={buyNowStore.product} />}
          {buyNowStore.product && <Total />}
        </div>
      </section>
    </BuyNowPageContext.Provider>
  );
};

export default observer(BuyNow);
