import { useEffect, useState } from 'react';

import logo from '@assets/images/logo.svg';

import styles from './Header.module.scss';
import Burger from '../Burger';
import Navigation from '../Navigation';
import User from '../User';

const Header = () => {
  const [isBurger, setIsBurger] = useState(false);

  const resizeHandler = () => {
    setIsBurger(document.body.clientWidth <= 880);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    resizeHandler();

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={`${styles.header__wrapper} wrapper`}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>

        {isBurger ? (
          <Burger>
            <Navigation />
            <User />
          </Burger>
        ) : (
          <>
            <Navigation />
            <User />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
