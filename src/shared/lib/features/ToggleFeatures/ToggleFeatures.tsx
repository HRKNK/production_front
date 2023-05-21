import { type ReactElement } from 'react';

import { type FeatureFlags } from 'shared/types/featureFlags';

import { getFeatureFlag } from '../setGetFeatures';

// Дженерик извне
interface ToggleFeaturesProps {
	feature: keyof FeatureFlags;
	on: ReactElement;
	off: ReactElement;
}

// Переключатель
export const ToggleFeatures = (props: ToggleFeaturesProps) => {
	const { on, off, feature } = props;

	if (getFeatureFlag(feature)) {
		return on;
	}

	return off;
};
