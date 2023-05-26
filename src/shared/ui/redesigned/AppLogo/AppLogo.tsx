import React, { memo } from 'react';

import AppSvg from 'shared/assets/icons/app-image.svg';
import classNames from 'shared/lib/classNames/classNames';

import { Icon } from '../../deprecated/Icon/public';
import { HStack } from '../../deprecated/Stack/public';
import cls from './AppLogo.module.scss';

interface AppLogoProps {
	className?: string;
	size?: number;
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => {
	return (
		<HStack max justify="center" className={classNames(cls.appLogoWrapper, {}, [className])}>
			<div className={cls.gradientBig} />
			<div className={cls.gradientSmall} />
			<AppSvg width={size} height={60} className={cls.appLogo} />
		</HStack>
	);
});
