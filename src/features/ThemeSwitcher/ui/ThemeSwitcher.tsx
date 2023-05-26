/* eslint-disable react/display-name */
import React, { memo, useCallback } from 'react';

import { useTheme } from 'app/providers/ThemeProvider/public';
import { saveJsonSettings } from 'entities/User/public';
// реакт преобразовывает svg в реакт компонент = компонент наследует пропс-атрибуты характерные для svg
// import DarkIcon from 'shared/assets/icons/theme-dark.svg';
// import LightIcon from 'shared/assets/icons/theme-light.svg';
import ThemeIconDeprecated from 'shared/assets/icons/theme-light.svg';
import ThemeIcon from 'shared/assets/icons/theme.svg';
import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures } from 'shared/lib/features/public';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ThemeButton } from 'shared/ui/deprecated/Button/Button';
import { Icon as IconDeprecated } from 'shared/ui/deprecated/Icon/Icon';
import { Icon } from 'shared/ui/redesigned/Icon/public';

import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
	className?: string;
}

const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
	const { theme, toggleTheme } = useTheme();
	const dispatch = useAppDispatch();
	const onToggleHandler = useCallback(() => {
		toggleTheme((newTheme) => {
			void dispatch(
				saveJsonSettings({
					theme: newTheme,
				})
			);
		});
	}, [dispatch, toggleTheme]);

	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
				<Icon
					Svg={ThemeIcon}
					clickable // иконка кликабельна
					onClick={onToggleHandler}
				/>
			}
			off={
				<Button theme={ThemeButton.CLEAR} className={classNames(cls.ThemeSwitcher, {}, [className])} onClick={onToggleHandler}>
					{/* {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />} */}
					{/* Svg принимает цвет Icon */}
					<IconDeprecated Svg={ThemeIconDeprecated} width={40} height={40} inverted></IconDeprecated>
				</Button>
			}
		/>
	);

	// return (
	// 	<Button theme={ThemeButton.CLEAR} className={classNames(cls.ThemeSwitcher, {}, [className])} onClick={onToogleHandler}>
	// 		{/* {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />} */}
	// 		{/* Svg принимает цвет Icon */}
	// 		<Icon Svg={ThemeIcon} width={40} height={40} inverted></Icon>
	// 	</Button>
	// );
});

export default ThemeSwitcher;
