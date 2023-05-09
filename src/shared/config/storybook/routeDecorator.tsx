import { type Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import 'app/styles/index.scss';

export const routeDecorator = (StoryComponent: Story) => {
	return (
		<BrowserRouter>
			<StoryComponent />
		</BrowserRouter>
	);
};
