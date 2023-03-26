import { type AddCommentFormSchema } from '../types/addCommentForm';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: AddCommentFormSchema = {
	text: '',
};

export const addCommentFormSlice = createSlice({
	name: 'addCommentForm',
	initialState,
	reducers: { // state = initialState
		setText: (state, action: PayloadAction<string>) => {
			state.text = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
