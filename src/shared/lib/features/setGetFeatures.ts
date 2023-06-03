import { LOCAL_STORAGE_LAST_DESIGN_KEY } from 'shared/const/localstorage';
import { type FeatureFlags } from 'shared/types/featureFlags';

let featureFlags: FeatureFlags = {
	// дэфолтное значение
	isAppRedesigned: localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new', // return true | false
};

// Кладем текущий флаг
export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
	if (newFeatureFlags) {
		featureFlags = newFeatureFlags;
	}
}

// Получаем текущий флаг
export function getFeatureFlag(flag: keyof FeatureFlags) {
	return featureFlags?.[flag];
}

// Вернуть все флаги
export function getAllFeatureFlags() {
	return featureFlags;
}
