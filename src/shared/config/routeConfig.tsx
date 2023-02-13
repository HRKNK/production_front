import { type RouteProps } from 'react-router-dom';

import { AboutPage } from 'pages/AboutPage/public';
import { MainPage } from 'pages/MainPage/public';

export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about',
}

// Record специальный ТС класс, который указывает Ключ(строка) + Свойство (строка)
export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
	[AppRoutes.ABOUT]: '/about',
};

// Record специальный ТС класс, который указывает Ключ(строка) + Свойство (резерв)
export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage/>,
	},
	[AppRoutes.ABOUT]: {
		path: RoutePath.about,
		element: <AboutPage/>,
	},
};
