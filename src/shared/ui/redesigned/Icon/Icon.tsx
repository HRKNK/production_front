import React, { memo } from 'react';

import classNames from 'shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

// Исключаем поле: onClick из резерв-типа (убираем двойное нажатие при кастомном onClick в ClickableBaseProps)
type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

// SvgProps включает в себя width/height
interface IconBaseProps extends SvgProps {
	className?: string;
	Svg: React.FC<React.SVGProps<SVGSVGElement>>;
}

// SVG - не кликабельно
interface NonClickableIconProps extends IconBaseProps {
	clickable?: false;
}

// SVG - кликабельно
interface ClickableBaseProps extends IconBaseProps {
	clickable: true;
	onClick: () => void;
}

export const Icon = memo((props: NonClickableIconProps | ClickableBaseProps) => {
	const { className, Svg, width = 32, height = 32, clickable, ...otherProps } = props;

	const icon = <Svg className={classNames(cls.Icon, {}, [className])} width={width} height={height} {...otherProps} onClick={undefined} />;

	// Если иконка кликабельна
	if (clickable) {
		return (
			<button type="button" className={cls.button} onClick={props.onClick} style={{ height, width }}>
				{icon}
			</button>
		);
	}
	// Обычная иконка
	return icon;
});
