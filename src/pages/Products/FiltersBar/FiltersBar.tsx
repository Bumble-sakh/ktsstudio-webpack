import React from 'react';

import styles from './FiltersBar.module.scss';
import Filter from '../Filter/Filter';
import Search from '../Search';

const FiltersBar = () => {
  return (
    <div className={styles.bar}>
      <Search />
      <Filter />
    </div>
  );
};

export default React.memo(FiltersBar);
