import { type Story } from '@storybook/react';
import 'app/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';

export const routeDecorator = (story: () => Story) => {
	return (
		<BrowserRouter>
			{story()}
		</BrowserRouter>
	);
};
