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
