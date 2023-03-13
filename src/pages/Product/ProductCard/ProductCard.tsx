import { FC } from 'react';

import Button from '@components/Button';
import { ProductModel } from '@store/models/product';

import styles from './ProductCard.module.scss';
import Slider from '../Slider';

export type ProductCardType = {
  product: ProductModel;
};

const ProductCard: FC<ProductCardType> = ({ product }) => {
  return (
    <div className={styles.product}>
      <Slider images={product.images} />

      <div className={styles.product__content}>
        <div className={styles.product__title}>{product?.title}</div>
        <div className={styles.product__subtitle}>{product?.description}</div>
        <div className={styles.product__price}>{`$${product?.price}`}</div>
        <div className={styles.product__buttons}>
          <Button>Buy Now</Button>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
