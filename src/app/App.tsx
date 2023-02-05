import React, { Suspense, useContext, useState } from 'react';
import './styles/index.scss';

import { Link, Route, Routes } from 'react-router-dom';
// npm i react-router-dom

import { AboutPage } from 'pages/AboutPage/public';
import { MainPage } from 'pages/MainPage/public';

import classNames from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider/public';

const App = () => {
	const {theme, toggleTheme} = useTheme();

	return (
		<div className={classNames('app', {}, [theme])}>
			<button onClick={toggleTheme}>Toggle Theme</button>

			{/* переходы по страницам(отменяет явление перезагрузки) */}
			<Link to={'/main'}>Главная</Link>
			<Link to={'/about'}>О сайте</Link>


			{/* компоненты с ленивой подгрузкой // https://ru.reactjs.org/docs/code-splitting.html */}
			<Suspense fallback={<div>Здесь размещается индикатор загрузки...</div>}>
				{/* маршрутизация */}
				<Routes> 				
					{/* путь(браузер), элемент(ссылка на компонент) */}
					<Route path={'/main'} element={<MainPage/>}></Route>
					<Route path={'/about'} element={<AboutPage/>}></Route>
				</Routes>
			</Suspense>


			{/* <Counter/> */}
		</div>
	);
};

export default App;