import React, { useState, FC, PropsWithChildren, useRef } from 'react';

import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import styles from './Burger.module.scss';

const Burger: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const nodeRef = useRef(null);

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

      <CSSTransition
        in={isOpen}
        nodeRef={nodeRef}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles['sidebar-enter'],
          enterActive: styles['sidebar-enter-active'],
          enterDone: styles['sidebar-enter-done'],
          exit: styles['sidebar-exit'],
          exitActive: styles['sidebar-exit-active'],
          exitDone: styles['sidebar-exit-done'],
        }}
      >
        <div
          ref={nodeRef}
          className={styles.sidebar}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {children}
        </div>
      </CSSTransition>
    </>
  );
};

export default Burger;
