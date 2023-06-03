import { type ReactElement } from 'react';

import { AppRoutes } from 'app/providers/router/config/routeConfig';
import { useRouteChange } from 'shared/lib/router/useRouteChange';
import { ScrollToolbar } from 'widgets/ScrollToolbar/public';

export function useAppToolbar() {
	const appRoute = useRouteChange();
	// отрисовка тулбара в зависимости от текущей страницы
	const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
		// OptionalRecord === Record с допустимым undefined
		[AppRoutes.ARTICLES]: <ScrollToolbar />,
		[AppRoutes.ARTICLES_DETAILS]: <ScrollToolbar />,
	};

	return toolbarByAppRoute[appRoute];
}
