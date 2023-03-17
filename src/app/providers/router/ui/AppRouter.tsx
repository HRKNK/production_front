import { getUserAuthData } from 'entities/User/public';
import React, { memo, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
// npm i react-router-dom

// import { AboutPage } from 'pages/AboutPage/public';
// import { MainPage } from 'pages/MainPage/public';

import { routeConfig } from 'shared/config/routeConfig';
import PageLoader from 'widgets/PageLoader/ui/PageLoader';

const AppRouter = () => {
	const isAuth = useSelector(getUserAuthData);
	// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
	const routes = useMemo(() =>
		Object.values(routeConfig).filter(route => {
			if (route.authOnly && !isAuth) {
				return false;
			}
			return true;
		}), [isAuth]);

	return (
		<div className='page-wrapper'>
			{/* компоненты с ленивой подгрузкой // https://ru.reactjs.org/docs/code-splitting.html */}
			<Suspense fallback={<PageLoader></PageLoader>}>
				{/* маршрутизация */}
				<Routes>
					{/* путь(браузер), элемент(ссылка на компонент) */}
					{/*
					<Route path={'/about'} element={<AboutPage/>}></Route> */}
					{/* {Object.values(routeConfig).map(({ element, path }) => ( */}
					{routes.map(({ element, path }) => (
						<Route key={path} path={path} element={element}></Route>
					))}
				</Routes>
			</Suspense>
		</div>
	);
};

export default memo(AppRouter);
