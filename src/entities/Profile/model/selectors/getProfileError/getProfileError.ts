import { type StateSchema } from 'app/providers/storeProvider/public';

export const getProfileError = (state: StateSchema) => state.profile?.error;
