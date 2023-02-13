import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
// npm i react-router-dom

// import { AboutPage } from 'pages/AboutPage/public';
// import { MainPage } from 'pages/MainPage/public';

import { routeConfig } from 'shared/config/routeConfig';

const AppRouter = () => {
	return (
		<div className='page-wrapper'>
			{/* компоненты с ленивой подгрузкой // https://ru.reactjs.org/docs/code-splitting.html */}
			<Suspense fallback={<div>Здесь размещается индикатор загрузки...</div>}>
				{/* маршрутизация */}
				<Routes>
					{/* путь(браузер), элемент(ссылка на компонент) */}
					{/*
					<Route path={'/about'} element={<AboutPage/>}></Route> */}
					{Object.values(routeConfig).map(({ element, path }) => (
						<Route key={path} path={path} element={element}></Route>
					))}
				</Routes>
			</Suspense>
		</div>
	);
};

export default AppRouter;
