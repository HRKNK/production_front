import { type StateSchema } from 'app/providers/storeProvider/public';

export const getProfileIsLoading = (state: StateSchema) => state.profile?.isLoading;
