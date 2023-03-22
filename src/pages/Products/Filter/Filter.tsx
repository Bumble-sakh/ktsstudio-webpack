import { useCallback, useContext, useEffect, useMemo } from 'react';

import filter from '@assets/images/filter.svg';
import CategoriesStore from '@store/CategoriesStore';
import FilterStore from '@store/FilterStore';
import { CategoryModel } from '@store/models/category';
import rootStore from '@store/RootStore/instance';
import { useLocalStore } from '@utils/useLocalStore';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';

import styles from './Filter.module.scss';
import { ProductsPageContext } from '../Products';

const Filter = () => {
  const context = useContext(ProductsPageContext);

  const categoriesStore = useLocalStore(() => new CategoriesStore());
  const filterStore = useLocalStore(() => new FilterStore());

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    categoriesStore.getCategories();
  }, [categoriesStore]);

  const optionOnClickHandler = useCallback(
    (category: CategoryModel) => {
      if (category.id) {
        searchParams.set('categoryId', String(category.id));
        setSearchParams(searchParams);
      } else {
        searchParams.delete('categoryId');
        setSearchParams(searchParams);
      }

      context.paginationStore.setDefaultPaginationPage();
      searchParams.delete('page');
      setSearchParams(searchParams);

      filterStore.toggleOptionsIsVisible();
    },
    [filterStore, context.paginationStore, searchParams, setSearchParams]
  );

  const options = useMemo(() => {
    return categoriesStore.categories.map((category) => {
      const categoryId =
        rootStore.queryParamsStore.getParam('categoryId') ?? '';
      const isSelected =
        filterStore.categoryId === category.id ||
        Number(categoryId) === category.id;

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
  }, [
    categoriesStore.categories,
    filterStore.categoryId,
    optionOnClickHandler,
  ]);

  return (
    <div className={styles.filter}>
      <div
        className={styles.filter__select}
        onClick={filterStore.toggleOptionsIsVisible}
      >
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
