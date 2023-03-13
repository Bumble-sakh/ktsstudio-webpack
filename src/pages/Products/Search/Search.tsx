import React, { useContext, useEffect, useCallback } from 'react';

import searchIcon from '@assets/images/search.svg';
import Button from '@components/Button';
import rootStore from '@store/RootStore/instance';
import SearchStore from '@store/SearchStore';
import { useLocalStore } from '@utils/useLocalStore';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';

import styles from './Search.module.scss';
import { ProductsPageContext } from '../Products';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const context = useContext(ProductsPageContext);

  const searchStore = useLocalStore(() => new SearchStore());

  useEffect(() => {
    const search = rootStore.queryParamsStore.getParam('search') ?? '';
    searchStore.setInputValue(search);
  }, [searchStore]);

  const onChangeHandler = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      searchStore.setInputValue(event.currentTarget.value);
    },
    [searchStore]
  );

  const onSubmitHandler = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();

      if (searchStore.inputValue) {
        searchParams.set('search', searchStore.inputValue);
        setSearchParams(searchParams);
      } else {
        searchParams.delete('search');
        setSearchParams(searchParams);
      }

      searchParams.delete('page');
      setSearchParams(searchParams);

      rootStore.queryParamsStore.setSearch(searchParams.toString());

      context.paginationStore.setDefaultPaginationPage();
    },
    [
      context.paginationStore,
      searchParams,
      searchStore.inputValue,
      setSearchParams,
    ]
  );

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <img src={searchIcon} alt="search" />
      <input
        type="search"
        className={styles.input}
        value={searchStore.inputValue}
        placeholder="Search property"
        onChange={onChangeHandler}
      />
      <Button type="submit">Find now</Button>
    </form>
  );
};

export default observer(Search);
