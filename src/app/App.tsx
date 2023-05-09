import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from 'app/providers/ThemeProvider/public';
import { AppRouter } from 'app/providers/router/public';
import { getUserInited, userActions } from 'entities/User/public';
// import { Link } from 'react-router-dom';
// npm i react-router-dom
import classNames from 'shared/lib/classNames/classNames';
import { NavBar } from 'widgets/NavBar/public';
import { SideBar } from 'widgets/SideBar/public';

const App = () => {
	const { theme } = useTheme();
	const dispatch = useDispatch();
	const inited = useSelector(getUserInited); // проверка на авторизацию

	useEffect(() => {
		dispatch(userActions.initAuthData());
	}, [dispatch]);

	return (
		<div className={classNames('app', {}, [theme])}>
			{/* переходы по страницам(отменяет явление перезагрузки) */}
			{/* <Link to={'/'}>Главная</Link> */}
			<Suspense fallback="">
				<NavBar></NavBar>
				<div className="content-page">
					<SideBar />
					{inited && <AppRouter />} {/* маршрутизация */}
				</div>
			</Suspense>
			{/* <Counter/> */}
		</div>
	);
};

export default App;
