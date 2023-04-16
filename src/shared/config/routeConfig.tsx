import { type RouteProps } from 'react-router-dom';

import { AboutPage } from 'pages/AboutPage/public';
import { MainPage } from 'pages/MainPage/public';
import { NotFoundPage } from 'pages/NotFoundPage/public';
import { ProfilePage } from 'pages/ProfilePage/public';
import { ArticlesPage } from 'pages/ArticlesPage/public';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage/public';
import { ArticleEditPage } from 'pages/ArticleEditPage/public';
import { AdminPanelPage } from 'pages/AdminPanelPage/public';
import { UserRole } from 'entities/User/public';
import { ForbiddenPage } from 'pages/ForbiddenPage/public';

export type AppRouteProps = RouteProps & { // Route properties
	authOnly?: boolean,
	roles?: UserRole[],
};

export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about',
	PROFILE = 'profile',
	ARTICLES = 'articles',
	ARTICLES_DETAILS = 'articles_details',
	ARTICLES_EDIT = 'articles_edit',
	ARTICLES_CREATE = 'articles_create',
	ADMIN_PANEL = 'admin_panel',
	FORBIDDEN = 'forbidden',
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
	[AppRoutes.ARTICLES_EDIT]: '/articles/:id/edit', // редактирование статьи ( id динамический путь )
	[AppRoutes.ARTICLES_CREATE]: '/articles/new', // новая статья
	[AppRoutes.ADMIN_PANEL]: '/admin', // админ панель
	[AppRoutes.FORBIDDEN]: '/forbidden', // доступ запрещен
	// Несуществующие маршруты: *
	[AppRoutes.NOT_FOUND]: '*',
};

// Record специальный ТС класс, который указывает Ключ(строка) + Свойство (резерв)
// export const routeConfig: Record<AppRoutes, RouteProps> = {
export const routeConfig: Record<AppRoutes, AppRouteProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage />,
	},
	[AppRoutes.ABOUT]: {
		path: RoutePath.about,
		element: <AboutPage />,
	},
	[AppRoutes.PROFILE]: {
		path: `${RoutePath.profile}:id`,
		element: <ProfilePage />,
		authOnly: true, // только для авторизованных
	},
	[AppRoutes.ARTICLES]: {
		path: RoutePath.articles,
		element: <ArticlesPage />,
		authOnly: true, // только для авторизованных
	},
	[AppRoutes.ARTICLES_DETAILS]: {
		path: `${RoutePath.articles_details}:id`,
		element: <ArticleDetailsPage />,
		authOnly: true, // только для авторизованных
	},

	// страница редактирования
	[AppRoutes.ARTICLES_EDIT]: {
		path: `${RoutePath.articles_edit}`,
		element: <ArticleEditPage />,
		authOnly: true, // только для авторизованных
	},
	[AppRoutes.ARTICLES_CREATE]: {
		path: `${RoutePath.articles_create}`,
		element: <ArticleEditPage />,
		authOnly: true, // только для авторизованных
	},
	[AppRoutes.ADMIN_PANEL]: {
		path: `${RoutePath.admin_panel}`,
		element: <AdminPanelPage />,
		authOnly: true,
		roles: [UserRole.ADMIN, UserRole.MANAGER], // доступ по ролям
	},
	[AppRoutes.FORBIDDEN]: {
		path: `${RoutePath.forbidden}`,
		element: <ForbiddenPage />,
	},

	// Несуществующие маршрут: * / 404
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
};
