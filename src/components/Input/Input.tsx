import React, { FC } from 'react';

import cn from 'classnames';

import st from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

const Input: FC<InputProps> = ({ value, onChange, ...props }) => {
  const classInput = cn(
    st.input,
    props.className,
    props.disabled ? st.input_disabled : '',
  );

  return (
    <>
      <input
        type="text"
        {...props}
        className={classInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className={st.input__clear} onClick={() => onChange('')} type="button">
          x
        </button>
      )}
    </>
  );
};

export default Input;
