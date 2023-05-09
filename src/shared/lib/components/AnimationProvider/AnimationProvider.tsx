/* eslint-disable @typescript-eslint/consistent-type-imports */
import { type ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

// Выводим типы от библиотеки
type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
	Gesture?: GestureType;
	Spring?: SpringType;
	isLoaded?: boolean; // состояние подгрузки библиотеки
}

const AnimationContext = createContext<AnimationContextPayload>({});

// Асинхронные библиотеки
const getAsyncAnimationModules = async () => {
	return await Promise.all([import('@react-spring/web'), import('@use-gesture/react')]);
};

export const useAnimationLibs = () => {
	return useContext(AnimationContext) as Required<AnimationContextPayload>; // обязательно вернет поля <AnimationContextPayload>
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
	const SpringRef = useRef<SpringType>();
	const GestureRef = useRef<GestureType>();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		void getAsyncAnimationModules().then(([Spring, Gesture]) => {
			SpringRef.current = Spring;
			GestureRef.current = Gesture;
			setIsLoaded(true);
		});
	}, []);

	const value = useMemo(
		() => ({
			Gesture: GestureRef.current,
			Spring: SpringRef.current,
			isLoaded,
		}),
		[isLoaded]
	);

	return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
};
