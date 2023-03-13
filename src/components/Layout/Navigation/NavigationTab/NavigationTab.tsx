import { FC } from 'react';

import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './NavigationTab.module.scss';

export type NavigationTabProps = {
  route: string;
  title: string;
};

const NavigationTab: FC<NavigationTabProps> = ({ route, title }) => {
  return (
    <li className={styles.list__item}>
      <NavLink
        to={route}
        className={({ isActive }) =>
          classNames({
            [styles.navigation__link]: true,
            [styles.navigation__link_active]: isActive,
          })
        }
      >
        {title}
      </NavLink>
    </li>
  );
};

export default NavigationTab;
