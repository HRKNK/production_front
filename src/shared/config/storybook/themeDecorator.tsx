/* eslint-disable react/display-name */
import { type Story } from '@storybook/react';
import { ThemeProvider, type Theme } from 'app/providers/ThemeProvider/public';
import React from 'react';

export const themeDecorator = (theme: Theme) => (StoryComponent: Story) => (
	<ThemeProvider initialTheme={theme}>
		<div className={`app ${theme}`}>
			<StoryComponent/>
		</div>
	</ThemeProvider>
);
