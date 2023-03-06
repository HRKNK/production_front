import { type StateSchema } from 'app/providers/storeProvider/config/stateSchema';

export const getUserAuthData = (state: StateSchema) => state.user.authData;
