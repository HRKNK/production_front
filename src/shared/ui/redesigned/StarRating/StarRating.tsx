import { memo, useState } from 'react';

import StarIcon from 'shared/assets/icons/star.svg';
import classNames from 'shared/lib/classNames/classNames';

import { Icon } from '../Icon/public';
import cls from './StarRating.module.scss';

interface StarRatingProps {
	className?: string;
	onSelect?: (starsCount: number) => void; // нажатие звезду
	size?: number;
	selectedStars?: number; // дэфолтно/выбранное значение
}

const stars = [1, 2, 3, 4, 5];

// eslint-disable-next-line react/display-name
export const StarRating = memo((props: StarRatingProps) => {
	const { className, size = 30, selectedStars = 0, onSelect } = props;

	const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
	const [isSelected, setIsSelected] = useState(Boolean(selectedStars)); // если юзер уже выбрал

	const onHover = (starsCount: number) => () => {
		// возвращаем функцию (замыкание)
		if (!isSelected) {
			setCurrentStarsCount(starsCount); // текущее кол-во звезд (по ховеру)
		}
	};

	const onLeave = () => {
		if (!isSelected) {
			setCurrentStarsCount(0); // сбросить текущее кол-во звезд (увел мышку)
		}
	};

	const onClick = (starsCount: number) => () => {
		// возвращаем функцию (замыкание)
		if (!isSelected) {
			onSelect?.(starsCount);
			setCurrentStarsCount(starsCount); // сохраняем выбранное кол-во звезд
			setIsSelected(true); // сохраняем состояние выбранной звезды
		}
	};

	return (
		<div className={classNames(cls.StarRatingRedesigned, {}, [className])}>
			{/* отрисовываем иконки звезд */}
			{stars.map((starNumber) => (
				<Icon
					clickable={!isSelected} // кликабельна если звезда не выбрана
					className={classNames(
						cls.starIcon,
						{ [cls.selected]: isSelected }, // мод на сброс курсора при выборе
						[currentStarsCount >= starNumber ? cls.hovered : cls.normal] // перекрашивание звезд
					)}
					Svg={StarIcon}
					key={starNumber}
					width={size}
					height={size}
					onMouseLeave={onLeave}
					onMouseEnter={onHover(starNumber)}
					onClick={onClick(starNumber)}
					data-testid={`StarRating.${starNumber}`}
					data-selected={currentStarsCount >= starNumber} // вернет true, если звезды выбраны
				/>
			))}
		</div>
	);
});
