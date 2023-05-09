/* eslint-disable react/display-name */
import React, { memo } from 'react';

import { Theme, useTheme } from 'app/providers/ThemeProvider/public';
// реакт преобразовывает svg в реакт компонент = компонент наследует пропс-атрибуты характерные для svg
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import classNames from 'shared/lib/classNames/classNames';

import { Button, ThemeButton } from '../../Button/Button';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
	className?: string;
}

const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button theme={ThemeButton.CLEAR} className={classNames(cls.ThemeSwitcher, {}, [className])} onClick={toggleTheme}>
			{theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
		</Button>
	);
});

export default ThemeSwitcher;
