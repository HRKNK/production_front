// https://redux-toolkit.js.org/usage/usage-with-typescript
// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
import { useDispatch } from 'react-redux';

import { type AppDispatch } from 'app/providers/storeProvider/public';

export const useAppDispatch: () => AppDispatch = useDispatch;
