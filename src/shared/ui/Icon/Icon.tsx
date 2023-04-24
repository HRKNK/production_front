import cls from './Icon.module.scss';

import classNames from 'shared/lib/classNames/classNames';
import React, { type VFC, memo } from 'react';

interface IconProps {
	className?: string;
	Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
	inverted?: boolean;
}

// eslint-disable-next-line react/display-name
export const Icon = memo((props: IconProps) => {
	const { className, Svg, inverted } = props;

	return (
		<Svg className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])} />
	);
});
