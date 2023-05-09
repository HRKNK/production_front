import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { type ScrollSaveSchema } from '../types/ScrollSaveSchema';

const initialState: ScrollSaveSchema = {
	scroll: {},
};

export const scrollSave = createSlice({
	name: 'ScrollSave',
	initialState,
	reducers: {
		// state = initialState
		setScrollPosition: (state, action: PayloadAction<{ path: string; position: number }>) => {
			// Адрес(Путь) страницы, позиция скролла PX
			state.scroll[action.payload.path] = action.payload.position;
		},
	},
});

// Action creators are generated for each case reducer function
export const { actions: scrollSaveActions } = scrollSave;
export const { reducer: scrollSaveReducer } = scrollSave;
