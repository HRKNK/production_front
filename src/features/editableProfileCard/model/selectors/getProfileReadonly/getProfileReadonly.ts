import { type StateSchema } from 'app/providers/storeProvider/public';

export const getProfileReadonly = (state: StateSchema) => state.profile?.readonly;
