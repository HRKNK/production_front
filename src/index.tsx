import React from 'react';
// npm i react react-dom
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from 'app/providers/ErrorBoundary/public';
import { ThemeProvider } from 'app/providers/ThemeProvider/public';
import StoreProvider from 'app/providers/storeProvider/ui/storeProvider';
import 'app/styles/index.scss';
import 'shared/config/I18n/i18n';

import App from './app/App';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
	<BrowserRouter>
		<StoreProvider>
			<ErrorBoundary>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</ErrorBoundary>
		</StoreProvider>
	</BrowserRouter>
);
