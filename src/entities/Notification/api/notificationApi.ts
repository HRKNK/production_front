import { type Notification } from '../model/types/notification';

import { rtkApi } from 'shared/api/rtkApi';

const notificationApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getNotifications: build.query<Notification[], null>({
			// build.query < (что возвращаем), (что ожидаем на вход) >
			query: () => ({
				url: '/notifications',
			}),
		}),
	}),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
