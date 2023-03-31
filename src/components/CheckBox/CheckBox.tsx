import React, { FC } from 'react';

import st from './Checkbox.module.scss';

/** Пропсы, которые принимает компонент CheckBox */
export type CheckBoxProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange'
> & {
    /** Вызывается при клике на чекбокс */
    onChange: (value: boolean) => void;
};

const CheckBox: FC<CheckBoxProps> = ({ onChange, ...props }) => {
    return (
        <>
            <input
                id='checkbox'
                name='checkbox'
                className={st.checkbox}
                type="checkbox"
                {...props}
                onChange={(e) => onChange(!props.checked)}
            />
            <label htmlFor='checkbox'></label>
        </>
    )
};

export default CheckBox;
