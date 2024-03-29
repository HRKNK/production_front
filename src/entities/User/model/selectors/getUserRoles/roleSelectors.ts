import { createSelector } from '@reduxjs/toolkit';

import { type StateSchema } from 'app/providers/storeProvider/public';

import { UserRole } from '../../consts/consts';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) => {
	// реселект
	return Boolean(roles?.includes(UserRole.ADMIN));
});

export const isUserManager = createSelector(getUserRoles, (roles) => {
	// реселект
	return Boolean(roles?.includes(UserRole.MANAGER));
});
