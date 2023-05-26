import React, { memo } from 'react';

import AppSvg from 'shared/assets/icons/app-image.svg';
import classNames from 'shared/lib/classNames/classNames';

import { Icon } from '../Icon/public';
import { HStack } from '../Stack/public';
import cls from './AppLogo.module.scss';

interface AppLogoProps {
	className?: string;
}

/**
 * @deprecated Устарело, используйте новый компонент редизайна
 */
export const AppLogo = memo(({ className }: AppLogoProps) => {
	return (
		<HStack max justify="center" className={classNames(cls.appLogoWrapper, {}, [className])}>
			<div className={cls.gradientBig} />
			<div className={cls.gradientSmall} />
			{/* <AppSvg className={cls.appLogo} /> */}
			<Icon width={60} height={60} className={cls.appLogo} Svg={AppSvg}></Icon>
		</HStack>
	);
});
