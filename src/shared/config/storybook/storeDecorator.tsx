/* eslint-disable react/display-name */
import { type Story } from '@storybook/react';
import { type DeepPartial } from '@reduxjs/toolkit';
import { StoreProvider } from 'app/providers/storeProvider/public';
import { type StateSchema } from 'entities/Counter/public';

export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryComponent: Story) => (
	<StoreProvider initialState={state}>
		<StoryComponent />
	</StoreProvider>
);
