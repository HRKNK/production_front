import { type StateSchema } from 'app/providers/storeProvider/public';

// Дополнить StateSchema
export const getAddCommentFormText = (state: StateSchema) => state.addCommentForm?.text ?? '';
export const getAddCommentFormError = (state: StateSchema) => state.addCommentForm?.error;
