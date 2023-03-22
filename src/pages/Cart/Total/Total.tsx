import Button from '@components/Button';
import rootStore from '@store/RootStore/instance';
import { observer } from 'mobx-react-lite';

import styles from './Total.module.scss';

const Total = () => {
  return (
    <div className={styles.total}>
      <div className={styles.content}>
        <p className={styles.title}>Total:</p>
        <p className={styles.price}>{`$${rootStore.cartStore.totalPrice}`}</p>
      </div>
      <Button>Buy</Button>
    </div>
  );
};

export default observer(Total);
