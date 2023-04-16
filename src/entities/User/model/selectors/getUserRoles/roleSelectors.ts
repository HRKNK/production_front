import { UserRole } from '../../types/user';

import { createSelector } from '@reduxjs/toolkit';
import { type StateSchema } from 'app/providers/storeProvider/public';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) => { // реселект
	return Boolean(roles?.includes(UserRole.ADMIN));
});

export const isUserManager = createSelector(getUserRoles, (roles) => { // реселект
	return Boolean(roles?.includes(UserRole.MANAGER));
});
