import cls from './Icon.module.scss';

import classNames from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';

interface IconProps {
	className?: string;
	Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

// eslint-disable-next-line react/display-name
export const Icon = memo((props: IconProps) => {
	const { className, Svg } = props;

	return (
		<Svg className={classNames(cls.Icon, {}, [className])} />
	);
});
