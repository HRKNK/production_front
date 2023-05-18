import { type FeatureFlags } from 'shared/types/featureFlags';

let featureFlags: FeatureFlags;

// Кладем текущий флаг
export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
	if (newFeatureFlags) {
		featureFlags = newFeatureFlags;
	}
}

// Получаем текущий флаг
export function getFeatureFlag(flag: keyof FeatureFlags) {
	return featureFlags[flag];
}
