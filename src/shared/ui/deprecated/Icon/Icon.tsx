import React, { type VFC, memo } from 'react';

import classNames from 'shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
	// расширение под свг пропсы
	className?: string;
	Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
	inverted?: boolean;
}

// eslint-disable-next-line react/display-name
/**
 * @deprecated Устарело, используйте новый компонент редизайна
 */
export const Icon = memo((props: IconProps) => {
	const { className, Svg, inverted, ...otherProps } = props;

	return <Svg className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])} {...otherProps} />;
});
