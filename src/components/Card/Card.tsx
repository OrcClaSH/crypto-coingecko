import React, { FC } from 'react';
import cn from 'classnames';

import { COLORS } from '@/config';
import GraphSmall from '@/App/pages/CoinsPage/components/GraphSmall';

import st from './Card.module.scss';

export type CardProps = {
    /** ID */
    id?: string
    /** URL изображения */
    image: string;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Подзаголовок карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    content?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Символ выбранной валюты */
    currencySymbol?: string;
    /** Цена */
    price: string;
    /** Изменение цены за последние 24 часа */
    priceChange: string;
    /** Данные для построения графика */
    graphData?: number[];
};

const Card: FC<CardProps> = ({
    id,
    image,
    title,
    subtitle,
    content,
    onClick,
    currencySymbol,
    price,
    priceChange,
    graphData,
}) => {

    const isPositiveChange = +priceChange > 0;
    const classesPriceChange = cn(
        st['card__change-price'],
        isPositiveChange
            ? st['card__change-price--positive']
            : st['card__change-price--negative']
    )

    return (
        <div className={st.card} onClick={onClick}>
            <img className={st.card__logo} src={image} alt="coin-logo" />
            <div className={st.card__names}>
                <h3 className={st.card__title}>{title}</h3>
                <div className={st.card__subtitle}>{subtitle}</div>
            </div>
            <div className={st.card__wrapper}>
                <div className={st.card__graph}>
                    <GraphSmall
                        data={graphData}
                        color={isPositiveChange ? COLORS.positive : COLORS.negative}
                    />
                </div>
                <div className={st.card__content}>
                    <p className={st.card__price}>
                        {currencySymbol}
                        {price}
                    </p>
                    <p className={classesPriceChange}
                    >
                        {isPositiveChange ? '+' : ''}
                        {priceChange}%
                    </p>
                </div>
            </div>
        </div>
    )
};

export default Card;
