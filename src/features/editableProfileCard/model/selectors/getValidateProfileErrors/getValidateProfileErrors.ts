import { type StateSchema } from 'app/providers/storeProvider/public';

export const getValidateProfileErrors = (state: StateSchema) => state.profile?.validateError;
