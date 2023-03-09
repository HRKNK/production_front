import { type StateSchema } from 'app/providers/storeProvider/public';

export const getLoginUsername = (state: StateSchema) => state?.loginForm?.username || '';
