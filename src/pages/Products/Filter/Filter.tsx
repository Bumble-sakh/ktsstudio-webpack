import { useEffect } from 'react';

import filter from '@assets/images/filter.svg';
import CategoriesStore from '@store/CategoriesStore';
import FilterStore from '@store/FilterStore';
import { CategoryModel } from '@store/models/category';
import PaginationStore from '@store/PaginationStore';
import { useLocalStore } from '@utils/useLocalStore';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';

import styles from './Filter.module.scss';

const Filter = () => {
  const categoriesStore = useLocalStore(() => new CategoriesStore());
  const paginationStore = useLocalStore(() => new PaginationStore());
  const filterStore = useLocalStore(() => new FilterStore());

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    categoriesStore.getCategories();
  }, [categoriesStore]);

  const selectOnClickHandler = () => {
    filterStore.toggleOptionsIsVisible();
  };

  const optionOnClickHandler = (category: CategoryModel) => {
    if (category.id) {
      searchParams.set('categoryId', String(category.id));
      setSearchParams(searchParams);
    } else {
      searchParams.delete('categoryId');
      setSearchParams(searchParams);
    }

    paginationStore.setPaginationPage(1);
    searchParams.delete('page');
    setSearchParams(searchParams);

    selectOnClickHandler();
  };

  const options = categoriesStore.categories.map((category) => {
    const isSelected = filterStore.categoryId === category.id;

    const classes = classNames({
      [styles.list__item]: true,
      [styles.list__item_selected]: isSelected,
    });

    return (
      <li
        key={category.id}
        className={classes}
        onClick={() => optionOnClickHandler(category)}
      >
        {category.name}
      </li>
    );
  });

  return (
    <div className={styles.filter}>
      <div className={styles.filter__select} onClick={selectOnClickHandler}>
        <img src={filter} alt="filter" />
        Filter
      </div>
      {filterStore.optionsIsVisible && (
        <div className={styles.filter__options}>
          <ul className={styles.list}>{options}</ul>
        </div>
      )}
    </div>
  );
};

export default observer(Filter);
