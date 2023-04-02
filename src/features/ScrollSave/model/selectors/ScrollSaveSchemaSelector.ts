import { type StateSchema } from 'app/providers/StoreProvider/public';
import { createSelector } from '@reduxjs/toolkit';

export const getUIScroll = (state: StateSchema) => state.scrollSave.scroll;
export const getUIScrollByPath = createSelector(getUIScroll, (state: StateSchema, path: string) => path, (scroll, path) => scroll[path] || 0);
