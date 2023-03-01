import App from './app/App';

import React from 'react';
import { render } from 'react-dom';
// npm i react react-dom

import 'app/styles/index.scss';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider/public';

import 'shared/config/I18n/i18n';
import { ErrorBoundary } from 'app/providers/ErrorBoundary/public';

render(
	<ErrorBoundary>
		<BrowserRouter>
			<ThemeProvider>
				<App/>
			</ThemeProvider>
		</BrowserRouter>
	</ErrorBoundary>,
	document.getElementById('root'),
);
