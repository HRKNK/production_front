/* eslint-disable react/display-name */
import { type Story } from '@storybook/react';
import { type ReducersMapObject, type DeepPartial } from '@reduxjs/toolkit';
import { StoreProvider } from 'app/providers/storeProvider/public';
import { type StateSchema } from 'entities/Counter/public';
import { loginReducer } from 'features/AuthByUserName/model/slice/loginSlice';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
	loginForm: loginReducer,
};

export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>) => (StoryComponent: Story) => (
	<StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
		<StoryComponent />
	</StoreProvider>
);
