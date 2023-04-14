import { type StateSchema } from 'app/providers/storeProvider/public';

export const getProfileData = (state: StateSchema) => state.profile?.data;
