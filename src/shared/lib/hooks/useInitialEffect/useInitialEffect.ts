import { useEffect } from 'react';

export function useInitialEffect (callback: () => void) {
	useEffect(() => {
		if (_PROJECT !== 'storybook') {
			callback();
		}
		// eslint-disable-next-line
    }, []);
}
