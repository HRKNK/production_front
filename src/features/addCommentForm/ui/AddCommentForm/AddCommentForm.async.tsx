import { type AddCommentFormProps } from './AddCommentForm';

import { type FC, lazy } from 'react';

export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(async () => await import('./AddCommentForm'));
