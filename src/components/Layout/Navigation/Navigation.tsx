import ROUTES from '@config/routes';

import styles from './Navigation.module.scss';
import NavigationTab from './NavigationTab';

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        <NavigationTab route={ROUTES.index} title="Products" />
        <NavigationTab route={ROUTES.categories} title="Categories" />
        <NavigationTab route={ROUTES.about} title="About Us" />
      </ul>
    </nav>
  );
};

export default Navigation;
