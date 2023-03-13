import React, { useState } from 'react';

import classNames from 'classnames';

import styles from './Burger.module.scss';

const Burger: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={classNames({
          [styles.burger]: true,
          [styles.burger_opened]: isOpen,
        })}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        className={classNames({
          [styles.sideBar]: true,
          [styles.sideBar_opened]: isOpen,
        })}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {children}
      </div>
    </>
  );
};

export default Burger;
