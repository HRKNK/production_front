import React, { Suspense, useState } from 'react';

// import { Link } from 'react-router-dom';
// npm i react-router-dom

import classNames from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider/public';
import { AppRouter } from 'app/providers/router/public';
import { NavBar } from 'widgets/NavBar/public';
import { SideBar } from 'widgets/SideBar/public';

const App = () => {
	const { theme } = useTheme();

	return (
		<div className={classNames('app', {}, [theme])}>

			{/* переходы по страницам(отменяет явление перезагрузки) */}
			{/* <Link to={'/'}>Главная</Link> */}
			<Suspense fallback=''>
				<NavBar></NavBar>
				<div className='content-page'>
					<SideBar/>
					<AppRouter/> {/* маршрутизация */}
				</div>
			</Suspense>
			{/* <Counter/> */}
		</div>
	);
};

export default App;
