import { RequireAuth } from './RequireAuth';

import { getUserAuthData } from 'entities/User/public';
import React, { memo, Suspense, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
// npm i react-router-dom

// import { AboutPage } from 'pages/AboutPage/public';
// import { MainPage } from 'pages/MainPage/public';

import { type AppRouteProps, routeConfig } from 'shared/config/routeConfig';
import PageLoader from 'widgets/PageLoader/ui/PageLoader';

const AppRouter = () => {
	const renderWithWrapper = useCallback((route: AppRouteProps) => { // IS AUTH
		return (
			<Route key={route.path} path={route.path} element={
				route.authOnly
					? <RequireAuth><>{route.element}</></RequireAuth>
					: route.element
			}></Route>
		);
	}, []);

	return (
		<div className='page-wrapper'>
			<Suspense fallback={<PageLoader></PageLoader>}>
				{/* компоненты с ленивой подгрузкой // https://ru.reactjs.org/docs/code-splitting.html */}
				{/* маршрутизация */}
				<Routes>
					{/* путь(браузер), элемент(ссылка на компонент) */}
					{/* <Route path={'/about'} element={<AboutPage/>}></Route> */}

					{/* {Object.values(routeConfig).map(({ element, path }) => (
						<Route key={path} path={path} element={element}></Route>
					))} */}

					{Object.values(routeConfig).map(renderWithWrapper)}
				</Routes>
			</Suspense>
		</div>
	);
};

export default memo(AppRouter);
