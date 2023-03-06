import { type StateSchema } from 'app/providers/storeProvider/config/stateSchema';

export const getLoginState = (state: StateSchema) => state?.loginForm;
