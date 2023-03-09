import React from 'react';

import Loader, { LoaderSize } from '@components/Loader';
import classNames from 'classnames';

import styles from './Button.module.scss';

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  ...attributes
}) => {
  if (loading) {
    attributes.disabled = true;
  }

  attributes.className = classNames(attributes.className, {
    [styles.button]: true,
    [styles.button_disabled]: attributes.disabled,
  });

  return (
    <button {...attributes}>
      {loading ? <Loader size={LoaderSize.s} /> : null}
      {children}
    </button>
  );
};

export default React.memo(Button);
