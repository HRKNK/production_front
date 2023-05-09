import { createSelector } from '@reduxjs/toolkit';

import { type StateSchema } from 'app/providers/storeProvider/public';

export const getUIScroll = (state: StateSchema) => state.scrollSave.scroll;
export const getUIScrollByPath = createSelector(
	getUIScroll,
	(state: StateSchema, path: string) => path,
	(scroll, path) => scroll[path] || 0
);
