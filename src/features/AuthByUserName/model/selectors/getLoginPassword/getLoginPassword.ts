import { type StateSchema } from 'app/providers/storeProvider/public';

export const getLoginPassword = (state: StateSchema) => state?.loginForm?.password || '';
