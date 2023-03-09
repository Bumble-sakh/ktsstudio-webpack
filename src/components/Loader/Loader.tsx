import React from 'react';

import classNames from 'classnames';

import styles from './Loader.module.scss';

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  size = LoaderSize.m,
  loading = true,
  className,
}) => {
  const classes = classNames(
    styles.loader,
    styles[`loader_${size}`],
    className
  );

  if (!loading) {
    return null;
  }

  return <div className={classes}></div>;
};

export default React.memo(Loader);
