import App from './app/App';

import React from 'react';
import { render } from 'react-dom';
// npm i react react-dom

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider/public';

import 'shared/config/I18n/i18n';

render(
	<BrowserRouter>
		<ThemeProvider>
			<App/>
		</ThemeProvider>
	</BrowserRouter>,
	document.getElementById('root'),
);
