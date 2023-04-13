import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export const rtkApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: _API,
		prepareHeaders: (headers) => {
			// некоторый interceptor
			const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
			if (token) {
				headers.set('Authorization', token);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({}),
});
