import { type StateSchema } from 'app/providers/storeProvider/public';

export const getLoginError = (state: StateSchema) => state?.loginForm?.error;
