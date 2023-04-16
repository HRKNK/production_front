import { type UserRole, getUserAuthData, getUserRoles } from 'entities/User/public';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig';

interface RequireAuthProps {
	children: JSX.Element;
	roles?: UserRole[];
}

export function RequireAuth ({ children, roles }: RequireAuthProps) {
	const auth = useSelector(getUserAuthData);
	const location = useLocation();

	// проверка ролей
	const userRoles = useSelector(getUserRoles);
	const hasRequiredRoles = useMemo(() => {
		if (!roles) {
			return true;
		}

		return roles.some((requiredRole) => { // some - хотя-бы один элемент
			const hasRole = userRoles?.includes(requiredRole);
			return hasRole;
		});
	}, [roles, userRoles]);

	if (!auth) {
		// Перенаправить их на страницу /main, но сохранить текущее местоположение, в котором они находились
		return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
	}

	if (!hasRequiredRoles) {
		// если нет нужных ролей
		return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
	}

	return children;
}
