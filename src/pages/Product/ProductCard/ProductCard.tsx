import React, { FC } from 'react';

import minus from '@assets/images/minus.svg';
import plus from '@assets/images/plus.svg';
import Button from '@components/Button';
import ROUTES from '@config/routes';
import { ProductModel } from '@store/models/product';
import rootStore from '@store/RootStore/instance';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

import styles from './ProductCard.module.scss';
import Slider from '../Slider';

export type ProductCardType = {
  product: ProductModel;
};

const ProductCard: FC<ProductCardType> = ({ product }) => {
  rootStore.cartStore.currentProduct = product.id;

  const addToCartHandler = () => {
    rootStore.cartStore.addToCart(product);
  };

  const removeFromCartHandler = () => {
    rootStore.cartStore.removeFromCart(product);
  };

  return (
    <div className={styles.product}>
      <Slider images={product.images} />

      <div className={styles.product__content}>
        <div className={styles.product__title}>{product?.title}</div>
        <div className={styles.product__subtitle}>{product?.description}</div>
        <div className={styles.product__price}>{`$${product?.price}`}</div>
        <div className={styles.product__buttons}>
          <NavLink to={`${ROUTES.buyNow}/${product.id}`}>
            <Button>Buy Now</Button>
          </NavLink>

          {!rootStore.cartStore.productAmount && (
            <Button
              className={styles.product__buttons_white}
              onClick={addToCartHandler}
            >
              Add to Cart
            </Button>
          )}
          {rootStore.cartStore.productAmount && (
            <div className={styles['product__buttons-group']}>
              <Button onClick={removeFromCartHandler}>
                <img src={minus} alt="minus" />
              </Button>
              <div>{rootStore.cartStore.productAmount}</div>
              <Button onClick={addToCartHandler}>
                <img src={plus} alt="plus" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(ProductCard);
