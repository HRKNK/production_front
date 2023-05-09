import { useEffect } from 'react';

export function useInitialEffect(callback: () => void) {
	useEffect(() => {
		if (_PROJECT !== 'storybook' && _PROJECT !== 'jest') {
			// проверка на тестирование (отмена эффекта лоадера)
			callback();
		}
		// eslint-disable-next-line
	}, []);
}
