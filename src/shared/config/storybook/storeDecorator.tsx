/* eslint-disable react/display-name */
import { type Story } from '@storybook/react';
// import { type ReducersMapObject, type DeepPartial } from '@reduxjs/toolkit';
import { StoreProvider } from 'app/providers/storeProvider/public';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { type StateSchema } from 'entities/Counter/public';
import { profileReducer } from 'entities/Profile/public';
import { loginReducer } from 'features/AuthByUserName/model/slice/loginSlice';
import { type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

// const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
const defaultAsyncReducers: ReducersList = {
	loginForm: loginReducer,
	profile: profileReducer,
	articleDetails: articleDetailsReducer,
};

// asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => (StoryComponent: Story) => (
	<StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
		<StoryComponent />
	</StoreProvider>
);
