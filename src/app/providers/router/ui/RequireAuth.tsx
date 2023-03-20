import { getUserAuthData } from 'entities/User/public';
import { useSelector } from 'react-redux';

import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig';

export function RequireAuth ({ children }: { children: JSX.Element, }) {
	const auth = useSelector(getUserAuthData);
	const location = useLocation();

	if (!auth) {
		// Перенаправить их на страницу /main, но сохранить текущее местоположение, в котором они находились
		return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
	}

	return children;
}
