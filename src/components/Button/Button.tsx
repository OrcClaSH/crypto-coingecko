import React, { FC } from 'react';

import cn from 'classnames';

import Loader from '../Loader';

import st from './Button.module.scss';

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  className?: string;
  disabled?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ loading, className, children, ...props }) => {
  const classButton = cn(
    st.button,
    className,
    loading || props.disabled ? st.button_disabled : '',
  );

  return (
    <button className={classButton} disabled={loading} type="button" {...props}>
      {loading && <Loader />}
      {children}
    </button>
  );
};

export default Button;
