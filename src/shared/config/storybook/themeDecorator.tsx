/* eslint-disable react/display-name */
import { type Story } from '@storybook/react';
import React from 'react';

import { type Theme, ThemeProvider } from 'app/providers/ThemeProvider/public';

export const themeDecorator = (theme: Theme) => (StoryComponent: Story) =>
	(
		<ThemeProvider initialTheme={theme}>
			<div className={`app ${theme}`}>
				<StoryComponent />
			</div>
		</ThemeProvider>
	);
