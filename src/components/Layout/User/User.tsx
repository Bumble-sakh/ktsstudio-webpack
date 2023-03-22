import cart from '@assets/images/cart.svg';
import user from '@assets/images/user.svg';
import ROUTES from '@config/routes';
import rootStore from '@store/RootStore/instance';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

import styles from './User.module.scss';

const User = () => {
  return (
    <div className={styles.user}>
      <ul className={styles.list}>
        <li className={styles.list__item}>
          <NavLink to={ROUTES.cart}>
            <img src={cart} alt="cart" />
            {!rootStore.cartStore.isEmpty && (
              <div>{rootStore.cartStore.productsAmount}</div>
            )}
          </NavLink>
        </li>
        <li className={styles.list__item}>
          <img src={user} alt="user" />
        </li>
      </ul>
    </div>
  );
};

export default observer(User);
