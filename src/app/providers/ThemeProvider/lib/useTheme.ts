import { useContext } from 'react';

import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

// интерфейс возврата
interface UseThemeResult {
	toggleTheme: () => void; // функция ничего не возвращает
	theme: Theme;
}

export function useTheme(): UseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext);

	const toggleTheme = () => {
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
				newTheme = Theme.DARK;
				break;
		}
		setTheme?.(newTheme);
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
	};

	return {
		theme: theme || Theme.LIGHT,
		toggleTheme,
	};
}
