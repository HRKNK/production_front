import { useContext } from 'react';

import { LOCAL_STORAGE_THEME_KEY } from 'shared/const/localstorage';

import { Theme, ThemeContext } from './ThemeContext';

// интерфейс возврата
interface UseThemeResult {
	toggleTheme: (saveAction: (theme: Theme) => void) => void; // функция ничего не возвращает
	theme: Theme;
}

export function useTheme(): UseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext);

	const toggleTheme = (saveAction: (theme: Theme) => void) => {
		let newTheme: Theme;
		switch (theme) {
			case Theme.DARK:
				newTheme = Theme.LIGHT;
				break;
			case Theme.LIGHT:
				newTheme = Theme.GREEN;
				break;
			case Theme.GREEN:
				newTheme = Theme.DARK;
				break;
			default:
				newTheme = Theme.GREEN;
				break;
		}
		setTheme?.(newTheme);
		saveAction?.(newTheme);

		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
	};

	return {
		theme: theme || Theme.LIGHT,
		toggleTheme,
	};
}
