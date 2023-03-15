/* eslint-disable react/display-name */
import { type Story } from '@storybook/react';
// import { type ReducersMapObject, type DeepPartial } from '@reduxjs/toolkit';
import { StoreProvider } from 'app/providers/storeProvider/public';
import { type StateSchema } from 'entities/Counter/public';
import { loginReducer } from 'features/AuthByUserName/model/slice/loginSlice';
import { type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

// const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
const defaultAsyncReducers: ReducersList = {
	loginForm: loginReducer,
};

// asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => (StoryComponent: Story) => (
	<StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
		<StoryComponent />
	</StoreProvider>
);
