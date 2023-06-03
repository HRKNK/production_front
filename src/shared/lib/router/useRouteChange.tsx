import { useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import { AppRouteByPathPattern, AppRoutes } from 'app/providers/router/config/routeConfig';

export function useRouteChange() {
	const location = useLocation(); // работа с маршрутами .pathname - текущий
	const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);

	useEffect(() => {
		// pattern равен энаму [AppRoutes.ARTICLES] что сетится в useState
		Object.entries(AppRouteByPathPattern).forEach(([route, pattern]) => {
			// matchPath сопоставление страниц
			if (matchPath(route, location.pathname)) {
				setAppRoute(pattern); // [AppRoutes.ARTICLES]
			}
		});
	}, [location.pathname]);

	return appRoute;
}
