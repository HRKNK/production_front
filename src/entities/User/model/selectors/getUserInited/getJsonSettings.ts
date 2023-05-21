import { type StateSchema } from 'app/providers/storeProvider/public';

import { type JsonSettings } from '../../types/jsonSettings';

const defaultSettings: JsonSettings = {};

export const getJsonSettings = (state: StateSchema) => state.user?.authData?.jsonSettings ?? defaultSettings;
