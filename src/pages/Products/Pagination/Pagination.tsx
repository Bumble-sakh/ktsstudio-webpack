import { useCallback, useEffect } from 'react';

import next from '@assets/images/next.svg';
import prev from '@assets/images/prev.svg';
import PAGINATION from '@config/pagination';
import PaginationStore from '@store/PaginationStore';
import rootStore from '@store/RootStore/instance';
import { useLocalStore } from '@utils/useLocalStore';
import classNames from 'classnames';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';

import styles from './Pagination.module.scss';
import { usePagination } from './usePagination';

type PaginationProps = {
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paginationStore = useLocalStore(() => new PaginationStore());

  const paginationRange = usePagination({
    currentPage: paginationStore.paginationPage,
    totalPages,
  });

  useEffect(() => {
    runInAction(() => {
      const page = rootStore.query.getParam('page') ?? 1;
      paginationStore.setPaginationPage(+page);
    });
  }, [paginationStore]);

  const nextHandle = useCallback(
    () =>
      runInAction(() => {
        const page =
          paginationStore.paginationPage + 1 < totalPages
            ? paginationStore.paginationPage + 1
            : totalPages;

        paginationStore.setPaginationPage(page);
        if (page > 1) {
          searchParams.set('page', String(page));
          setSearchParams(searchParams);
        } else {
          searchParams.delete('page');
          setSearchParams(searchParams);
        }
      }),
    [searchParams, setSearchParams, totalPages, paginationStore]
  );

  const prevHandle = useCallback(
    () =>
      runInAction(() => {
        const page =
          paginationStore.paginationPage - 1 > 1
            ? paginationStore.paginationPage - 1
            : 1;

        paginationStore.setPaginationPage(page);
        if (page > 1) {
          searchParams.set('page', String(page));
          setSearchParams(searchParams);
        } else {
          searchParams.delete('page');
          setSearchParams(searchParams);
        }
      }),
    [searchParams, setSearchParams, paginationStore]
  );

  const onPageChange = useCallback(
    (page: number) =>
      runInAction(() => {
        paginationStore.setPaginationPage(page);

        if (page > 1) {
          searchParams.set('page', String(page));
          setSearchParams(searchParams);
        } else {
          searchParams.delete('page');
          setSearchParams(searchParams);
        }
      }),
    [searchParams, setSearchParams, paginationStore]
  );

  return (
    <div className={styles.pagination}>
      <div
        className={classNames(styles.prev, {
          [styles.prev_disabled]: paginationStore.paginationPage === 1,
        })}
        onClick={prevHandle}
      >
        <img src={prev} alt="prev" />
      </div>

      <div className={styles.pages}>
        {paginationRange.map((pageNumber, idx) => {
          if (pageNumber === PAGINATION.dots) {
            return (
              <li key={idx} className={styles.dots}>
                ...
              </li>
            );
          }

          return (
            <li
              key={idx}
              className={classNames(styles.page, {
                [styles.page_selected]:
                  pageNumber === paginationStore.paginationPage,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
      </div>

      <div
        className={classNames(styles.next, {
          [styles.next_disabled]: paginationStore.paginationPage === totalPages,
        })}
        onClick={nextHandle}
      >
        <img src={next} alt="next" />
      </div>
    </div>
  );
};

export default observer(Pagination);
