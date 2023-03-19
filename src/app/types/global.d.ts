// Глобальная декларация типов

// https://stackoverflow.com/questions/41336858/how-to-import-css-modules-with-typescript-react-and-webpack
declare module '*.scss' {
	type IClassNames = Record<string, string>;
	const classNames: IClassNames;
	export = classNames;
}

// https://github.com/gregberge/svgr/issues/546
declare module '*.svg' {
	import type React from 'react';
	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare const _IS_DEV: boolean;
declare const _API: string;
declare const _PROJECT: 'storybook' | 'frontend' | 'jest';

// https://stackoverflow.com/questions/61132262/typescript-deep-partial
type DeepPartial<T> = T extends object ? {
	[P in keyof T]?: DeepPartial<T[P]>;
} : T;
