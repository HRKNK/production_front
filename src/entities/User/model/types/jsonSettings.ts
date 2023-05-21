import { type Theme } from 'app/providers/ThemeProvider/public';

// Локальные настройки в БД
export interface JsonSettings {
	theme?: Theme;
	isFirstVisit?: true;
	settingsPageHasBeenOpen?: false;
}
