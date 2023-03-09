import { type StateSchema } from 'app/providers/storeProvider/public';

export const getLoginIsLoading = (state: StateSchema) => state?.loginForm?.isLoading || false;
