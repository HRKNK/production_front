import { ResolveOptions } from 'webpack';

export function buildResolvers(): ResolveOptions { // TS type
	return {
		extensions: ['.tsx', '.ts', '.js'], // TS расширения импортируемых компонентов
	}
}