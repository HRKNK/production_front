/* eslint-disable custom-plugin/public-imports */

/* eslint-disable react/display-name */
import { type Story } from '@storybook/react';

// import { type ReducersMapObject, type DeepPartial } from '@reduxjs/toolkit';
import { StoreProvider } from 'app/providers/storeProvider/public';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { type StateSchema } from 'entities/Counter/public';
import { loginReducer } from 'features/AuthByUserName/model/slice/loginSlice';
import { addCommentFormReducer } from 'features/addCommentForm/model/slices/addCommentFormSlice';
import { profileReducer } from 'features/editableProfileCard/model/slice/profileSlice';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices/public';
import { type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

// const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
const defaultAsyncReducers: ReducersList = {
	loginForm: loginReducer,
	profile: profileReducer,
	articleDetails: articleDetailsReducer,
	addCommentForm: addCommentFormReducer,
	articleDetailsPage: articleDetailsPageReducer,
};

// asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => (StoryComponent: Story) =>
	(
		<StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
			<StoryComponent />
		</StoreProvider>
	);
