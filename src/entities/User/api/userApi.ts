import { rtkApi } from 'shared/api/rtkApi';

import { type JsonSettings } from '../model/types/jsonSettings';
import { type User } from '../model/types/user';

interface SetJsonSettingsArg {
	userId: string;
	jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
			// build.mutation < (что возвращаем), (что ожидаем на вход) >
			query: ({ userId, jsonSettings }) => ({
				url: `/users/${userId}`,
				method: 'PATCH',
				body: {
					jsonSettings,
				},
			}),
		}),
		getUserDataByID: build.query<User, string>({
			// build.query < (что возвращаем), (что ожидаем на вход) >
			query: (userId) => ({
				url: `/users/${userId}`,
				method: 'GET',
			}),
		}),
	}),
});

// export const useSetJsonSettingsMutation = userApi.useSetJsonSettingsMutation;

// Запрос без хука (позволяет вызвать вне компонентов) // https://redux-toolkit.js.org/rtk-query/usage/usage-without-react-hooks#adding-a-subscription
export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate;
export const getUserDataByIDQuery = userApi.endpoints.getUserDataByID.initiate;
