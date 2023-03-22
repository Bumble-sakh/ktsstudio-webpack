import { useEffect } from 'react';

import Card from '@components/Card';
import Loader, { LoaderSize } from '@components/Loader';
import ProductStore from '@store/ProductStore';
import RelatedStore from '@store/RelatedStore';
import { Meta } from '@utils/Meta';
import { useLocalStore } from '@utils/useLocalStore';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import styles from './Product.module.scss';
import ProductCard from './ProductCard';

const Product = () => {
  const { id } = useParams();

  const productStore = useLocalStore(() => new ProductStore());
  const relatedStore = useLocalStore(() => new RelatedStore());

  window.scrollTo(0, 0);

  useEffect(() => {
    id && productStore.getProduct(id);
  }, [id, productStore]);

  useEffect(
    () =>
      runInAction(() => {
        if (productStore.product) {
          const id = String(productStore.product.category.id);
          relatedStore.getRelated(id);
        }
      }),
    [relatedStore, productStore.product]
  );

  return (
    <section className={styles.section}>
      <div className={`${styles.section__wrapper} wrapper`}>
        {productStore.meta === Meta.loading && <Loader size={LoaderSize.l} />}

        {productStore.product && <ProductCard product={productStore.product} />}

        <h2 className={styles.title}>Related Items</h2>

        {relatedStore.meta === Meta.loading ? (
          <Loader size={LoaderSize.l} />
        ) : (
          <ul className={styles.cards}>
            {relatedStore.related.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default observer(Product);
