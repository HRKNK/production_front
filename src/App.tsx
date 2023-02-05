import React, { Suspense, useContext, useState } from 'react';
import './styles/index.scss';

import { someFn } from "./test";
import Counter from "./components/Counter";

import { Link, Route, Routes } from 'react-router-dom';
// npm i react-router-dom

// import AboutPage from './pages/AboutPage/AboutPage';
// import MainPage from './pages/MainPage/MainPage';

import { MainPageAsync } from './pages/MainPage/MainPage.async';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';

import { useTheme } from './theme/useTheme';
import classNames from './helpers/classNames/classNames';


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
					<Route path={'/main'} element={<MainPageAsync/>}></Route>
					<Route path={'/about'} element={<AboutPageAsync/>}></Route>
				</Routes>
			</Suspense>


			{/* <Counter/> */}
		</div>
	);
};

export default App;