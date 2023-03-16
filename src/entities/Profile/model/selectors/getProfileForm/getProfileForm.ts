import { type StateSchema } from 'app/providers/storeProvider/public';

export const getProfileForm = (state: StateSchema) => state.profile?.form;
