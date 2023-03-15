import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

import { useContext } from 'react';

// интерфейс возврата
interface UseThemeResult {
	toggleTheme: () => void; // функция ничего не возвращает
	theme: Theme;
}

export function useTheme (): UseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext);

	const toggleTheme = () => {
		const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
		setTheme?.(newTheme);
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
	};

	return {
		theme: theme || Theme.LIGHT,
		toggleTheme,
	};
}
