import { useCallback, useContext, useEffect } from 'react';

import next from '@assets/images/next.svg';
import prev from '@assets/images/prev.svg';
import PAGINATION from '@config/pagination';
import rootStore from '@store/RootStore/instance';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';

import styles from './Pagination.module.scss';
import { usePagination } from './usePagination';
import { ProductsPageContext } from '../Products';

type PaginationProps = {
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const context = useContext(ProductsPageContext);

  const paginationRange = usePagination({
    currentPage: context.paginationStore.paginationPage,
    totalPages,
  });

  useEffect(() => {
    const page = rootStore.queryParamsStore.getParam('page') ?? 1;
    context.paginationStore.setPaginationPage(+page);
  }, [context.paginationStore]);

  const nextHandle = useCallback(() => {
    const page =
      context.paginationStore.paginationPage + 1 < totalPages
        ? context.paginationStore.paginationPage + 1
        : totalPages;

    context.paginationStore.setPaginationPage(page);
    if (page > 1) {
      searchParams.set('page', String(page));
      setSearchParams(searchParams);
    } else {
      searchParams.delete('page');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, totalPages, context.paginationStore]);

  const prevHandle = useCallback(() => {
    const page =
      context.paginationStore.paginationPage - 1 > 1
        ? context.paginationStore.paginationPage - 1
        : 1;

    context.paginationStore.setPaginationPage(page);
    if (page > 1) {
      searchParams.set('page', String(page));
      setSearchParams(searchParams);
    } else {
      searchParams.delete('page');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, context.paginationStore]);

  const onPageChange = useCallback(
    (page: number) => {
      context.paginationStore.setPaginationPage(page);

      if (page > 1) {
        searchParams.set('page', String(page));
        setSearchParams(searchParams);
      } else {
        searchParams.delete('page');
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams, context.paginationStore]
  );

  return (
    <div className={styles.pagination}>
      <div
        className={classNames(styles.prev, {
          [styles.prev_disabled]: context.paginationStore.paginationPage === 1,
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
                  pageNumber === context.paginationStore.paginationPage,
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
          [styles.next_disabled]:
            context.paginationStore.paginationPage === totalPages,
        })}
        onClick={nextHandle}
      >
        <img src={next} alt="next" />
      </div>
    </div>
  );
};

export default observer(Pagination);
