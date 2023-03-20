import { type StateSchema } from 'app/providers/storeProvider/public';

export const getUserInited = (state: StateSchema) => state.user._inited;
