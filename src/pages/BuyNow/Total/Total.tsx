import { useContext } from 'react';

import Button from '@components/Button';
import { observer } from 'mobx-react-lite';

import styles from './Total.module.scss';
import { BuyNowPageContext } from '../BuyNow';

const Total = () => {
  const context = useContext(BuyNowPageContext);

  return (
    <div className={styles.total}>
      <div className={styles.content}>
        <p className={styles.title}>Total:</p>
        <p className={styles.price}>{`$${context.buyNowStore.total}`}</p>
      </div>
      <Button>Buy</Button>
    </div>
  );
};

export default observer(Total);
