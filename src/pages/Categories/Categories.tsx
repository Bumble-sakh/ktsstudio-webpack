import { useEffect } from 'react';

import Loader, { LoaderSize } from '@components/Loader';
import CategoriesStore from '@store/CategoriesStore';
import { Meta } from '@utils/Meta';
import { useLocalStore } from '@utils/useLocalStore';
import { observer } from 'mobx-react-lite';

import styles from './Categories.module.scss';
import CategoryCard from './CategoryCard';

const Categories = () => {
  const categoriesStore = useLocalStore(() => new CategoriesStore());

  useEffect(() => {
    categoriesStore.getCategories();
  }, [categoriesStore]);

  return (
    <section className={styles.section}>
      <div className={`${styles.section__wrapper} wrapper`}>
        <h1 className={styles.title}>Categories</h1>
        <p className={styles.subtitle}>
          All product categories that we have are shown here.
        </p>

        {categoriesStore.meta === Meta.loading ? (
          <Loader size={LoaderSize.l} />
        ) : (
          <>
            <h2 className={styles.total}>
              Total
              <span className={styles.total__count}>
                {categoriesStore.totalCategories}
              </span>
            </h2>

            <ul className={styles.cards}>
              {categoriesStore.categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

export default observer(Categories);
