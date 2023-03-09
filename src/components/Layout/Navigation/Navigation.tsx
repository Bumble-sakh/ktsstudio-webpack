import ROUTES from '@config/routes';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        <li className={`${styles.list__item}`}>
          <NavLink
            to={ROUTES.index}
            className={({ isActive }) =>
              classNames({
                [styles.navigation__link]: true,
                [styles.navigation__link_active]: isActive,
              })
            }
          >
            Products
          </NavLink>
        </li>

        <li className={styles.list__item}>
          <NavLink
            to={ROUTES.categories}
            className={({ isActive }) =>
              classNames({
                [styles.navigation__link]: true,
                [styles.navigation__link_active]: isActive,
              })
            }
          >
            Categories
          </NavLink>
        </li>

        <li className={styles.list__item}>
          <NavLink
            to={ROUTES.about}
            className={({ isActive }) =>
              classNames({
                [styles.navigation__link]: true,
                [styles.navigation__link_active]: isActive,
              })
            }
          >
            About Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
