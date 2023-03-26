import { type RouteProps } from 'react-router-dom';

import { AboutPage } from 'pages/AboutPage/public';
import { MainPage } from 'pages/MainPage/public';
import { NotFoundPage } from 'pages/NotFoundPage/public';
import { ProfilePage } from 'pages/ProfilePage/public';
import { ArticlesPage } from 'pages/ArticlesPage/public';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage/public';

export type AppRouteProps = RouteProps & { // Route properties
	authOnly?: boolean,
};

export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about',
	PROFILE = 'profile',
	ARTICLES = 'articles',
	ARTICLES_DETAILS = 'articles_details',
	//
	NOT_FOUND = 'not_found',
}

// Record специальный ТС класс, который указывает Ключ(строка) + Свойство (строка)
export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
	[AppRoutes.ABOUT]: '/about',
	[AppRoutes.PROFILE]: '/profile/', // profile/10 ( id динамический путь )
	[AppRoutes.ARTICLES]: '/articles',
	[AppRoutes.ARTICLES_DETAILS]: '/articles/', // articles/10 ( id динамический путь )
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
		path: `${RoutePath.profile}:id`, // динамический путь
		element: <ProfilePage/>,
		authOnly: true, // только для авторизованных
	},
	[AppRoutes.ARTICLES]: {
		path: RoutePath.articles,
		element: <ArticlesPage/>,
		authOnly: true, // только для авторизованных
	},
	[AppRoutes.ARTICLES_DETAILS]: {
		path: `${RoutePath.articles_details}:id`, // динамический путь
		element: <ArticleDetailsPage/>,
		authOnly: true, // только для авторизованных
	},

	// Несуществующие маршрут: * / 404
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage/>,
	},
};
