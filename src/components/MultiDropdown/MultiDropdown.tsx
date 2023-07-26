import React, { FC } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import st from './MultiDropdown.module.scss';

import { ReactComponent as ArrowImg } from '@/assets/img/arrow.svg';
import { useOutsideClick } from '@/hooks/useOutsideClick';

/** Вариант для выбора в фильтре */
export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value?: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (el: Option) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
  isSmall: boolean;
};

const MultiDropdown: FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
  isSmall,
}) => {
  const { ref, isShow, setIsShow } = useOutsideClick(false);

  const handleItemClass = (item: Option): string => {
    return cn(
      st['multi-dropdown__item'],
      value.map((item) => item.key).includes(item.key)
        ? st['multi-dropdown__item--active']
        : '',
    );
  };

  const handleClick = (item: Option): void => {
    onChange(item);
    setIsShow(false);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLLIElement>,
    item: Option,
  ): void => {
    if (event.key === 'Enter') {
      handleClick(item);
    }
  };

  return (
    <div className={cn(st['multi-dropdown'], isSmall ? st['multi-dropdown--small'] : '')}>
      <div className={st['multi-dropdown__btn-wrapper']}>
        <button
          className={st['multi-dropdown__btn']}
          disabled={disabled}
          onClick={() => setIsShow((prev) => !prev)}
          type="button"
        >
          {pluralizeOptions(value)}
        </button>
        <ArrowImg className={st['multi-dropdown__btn-img']} />
      </div>

      {!disabled && isShow && (
        <ul className={st['multi-dropdown__items']} ref={ref}>
          {options.map((item) => (
            <li
              className={handleItemClass(item)}
              key={item.key}
              onClick={() => handleClick(item)}
              role="menuitem"
              tabIndex={0}
              onKeyPress={(event) => handleKeyPress(event, item)}
            >
              {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default observer(MultiDropdown);
