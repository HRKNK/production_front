import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): ResolveOptions { // TS type
	return {
		extensions: [".ts", ".tsx", ".js", ".jsx"], // TS расширения импортируемых компонентов
		preferAbsolute: true, // использование абсолютных путей
		modules: [ options.paths.src, 'node_modules'],
		mainFiles: ['index'],
		alias: {},
	}
}