import { type RouteProps } from 'react-router-dom';

import { AboutPage } from 'pages/AboutPage/public';
import { MainPage } from 'pages/MainPage/public';
import { NotFoundPage } from 'pages/NotFoundPage/public';
import { ProfilePage } from 'pages/ProfilePage/public';

export type AppRouteProps = RouteProps & { // Route properties
	authOnly?: boolean,
};

export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about',
	PROFILE = 'profile',
	//
	NOT_FOUND = 'not_found',
}

// Record специальный ТС класс, который указывает Ключ(строка) + Свойство (строка)
export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
	[AppRoutes.ABOUT]: '/about',
	[AppRoutes.PROFILE]: '/profile',
	// Несуществующие маршруты: *
	[AppRoutes.NOT_FOUND]: '*',
};

// Record специальный ТС класс, который указывает Ключ(строка) + Свойство (резерв)
// export const routeConfig: Record<AppRoutes, RouteProps> = {
export const routeConfig: Record<AppRoutes, AppRouteProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage/>,
	},
	[AppRoutes.ABOUT]: {
		path: RoutePath.about,
		element: <AboutPage/>,
	},
	[AppRoutes.PROFILE]: {
		path: RoutePath.profile,
		element: <ProfilePage/>,
		authOnly: true,
	},

	// Несуществующие маршрут: * / 404
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage/>,
	},
};
