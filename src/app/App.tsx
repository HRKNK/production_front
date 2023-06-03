import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useTheme } from 'app/providers/ThemeProvider/public';
import { AppRouter } from 'app/providers/router/public';
import { getUserInited, initAuthData } from 'entities/User/public';
import { AppLoaderLayout } from 'shared/layouts/AppLoaderLayout/AppLoaderLayout';
import { MainLayout } from 'shared/layouts/MainLayout/public';
// import { Link } from 'react-router-dom';
// npm i react-router-dom
import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures } from 'shared/lib/features/public';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { NavBar } from 'widgets/NavBar/public';
import { PageLoader } from 'widgets/PageLoader/public';
import { ScrollToolbar } from 'widgets/ScrollToolbar/public';
import { SideBar } from 'widgets/SideBar/public';

import { useAppToolbar } from './lib/useAppToolbar';

const App = () => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const inited = useSelector(getUserInited); // проверка на авторизацию
	const toolbar = useAppToolbar(); // где отрисовать тулбар

	useEffect(() => {
		// dispatch(userActions.initAuthData());
		void dispatch(initAuthData()); // Заменено extraReducers
	}, [dispatch]);

	if (!inited) {
		// лоадер при инициализации
		return (
			<div id="app" className={classNames('app_redesigned', {}, [theme])}>
				{/* <AppLoaderLayout /> */}
				<ToggleFeatures feature={'isAppRedesigned'} on={<AppLoaderLayout />} off={<PageLoader />} />
			</div>
		);
	}

	// Фича-флаг
	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			off={
				<div id="app" className={classNames('app', {}, [theme])}>
					<Suspense fallback="">
						<NavBar></NavBar>
						<div className="content-page">
							<SideBar />
							{inited && <AppRouter />} {/* маршрутизация */}
						</div>
					</Suspense>
				</div>
			}
			on={
				<div id="app" className={classNames('app_redesigned', {}, [theme])}>
					<Suspense fallback="">
						{/* <ScrollToolbar /> */}
						<MainLayout content={<AppRouter />} header={<NavBar />} sidebar={<SideBar />} toolbar={toolbar} />
					</Suspense>
				</div>
			}
		/>
	);

	// Перенесено в фича-флаг
	// return (
	// 	<div className={classNames('app', {}, [theme])}>
	// 		{/* переходы по страницам(отменяет явление перезагрузки) */}
	// 		{/* <Link to={'/'}>Главная</Link> */}
	// 		<Suspense fallback="">
	// 			<NavBar></NavBar>
	// 			<div className="content-page">
	// 				<SideBar />
	// 				{inited && <AppRouter />} {/* маршрутизация */}
	// 			</div>
	// 		</Suspense>
	// 		{/* <Counter/> */}
	// 	</div>
	// );
};

export default App;
