import { rtkApi } from 'shared/api/rtkApi';
import { type FeatureFlags } from 'shared/types/featureFlags';

interface UpdateFeatureFlagsOptions {
	userId: string;
	features: Partial<FeatureFlags>;
}

const featureFlagsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOptions>({
			// build.mutation < (что возвращаем), (что ожидаем на вход) >
			query: ({ userId, features }) => ({
				url: `/users/${userId}`,
				method: 'PATCH',
				body: {
					features,
				},
			}),
		}),
	}),
});

// export const useUpdateFeatureFlags = featureFlagsApi.useUpdateFeatureFlags;

// Запрос без хука (позволяет вызвать вне компонентов) // https://redux-toolkit.js.org/rtk-query/usage/usage-without-react-hooks#adding-a-subscription
export const updateFeatureFlagsMutation = featureFlagsApi.endpoints.updateFeatureFlags.initiate;
