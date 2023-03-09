import { useEffect } from 'react';

import Button from '@components/Button';
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
import Slider from './Slider';

const Product = () => {
  const { id } = useParams();

  const productStore = useLocalStore(() => new ProductStore());
  const relatedStore = useLocalStore(() => new RelatedStore());

  useEffect(() => {
    id && productStore.getProduct(id);
  }, [id, productStore]);

  useEffect(() => {
    runInAction(() => {
      if (productStore.product) {
        const id = String(productStore.product.category.id);
        relatedStore.getRelated(id);
      }
    });
  }, [relatedStore, productStore.product]);

  return (
    <section className={styles.section}>
      <div className={`${styles.section__wrapper} wrapper`}>
        {productStore.meta === Meta.loading ? (
          <Loader size={LoaderSize.l} />
        ) : (
          <div className={styles.product}>
            {productStore.product && (
              <Slider images={productStore.product.images} />
            )}

            <div className={styles.product__content}>
              <div className={styles.product__title}>
                {productStore.product?.title}
              </div>
              <div className={styles.product__subtitle}>
                {productStore.product?.description}
              </div>
              <div
                className={styles.product__price}
              >{`$${productStore.product?.price}`}</div>
              <div className={styles.product__buttons}>
                <Button>Buy Now</Button>
                <Button>Add to Cart</Button>
              </div>
            </div>
          </div>
        )}

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
