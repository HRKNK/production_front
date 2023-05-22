module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: [
		'plugin:react/recommended',
		'standard-with-typescript',
		'plugin:i18next/recommended',
		'plugin:storybook/recommended',
		'plugin:react-hooks/recommended',
		'prettier',
	],
	overrides: [
		// исключение
		{
			files: ['**/src/**/*.{test,stories}.{ts,tsx,js,jsx}'],
			rules: {
				'i18next/no-literal-string': 'off', // отключить переводы внутри test.[j]tsx
				'max-len': 'off',
			},
		},
	],

	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json'],
	},
	plugins: ['react', 'i18next', 'react-hooks', 'custom-plugin', 'unused-imports'],
	rules: {
		'no-console': 'warn', // варнинги на консоль в коде
		'unused-imports/no-unused-imports': 'warn', // варн на неиспользуемый импорт

		// quotes: ['warn', 'single'], // правило кавычек (single ? double)
		// 'jsx-quotes': ['warn', 'prefer-single'], // правило кавычек для jsx (prefer-single ? prefer-single)

		'prefer-const': 'error', // использование констант для неизменяемых переменных
		'max-len': ['error', { code: 200, ignoreComments: true }], // максимальная длина строки + правило игнорирует комментарии

		// indent: ['warn', 'tab'], // отступы
		// 'react/jsx-indent': ['warn', 'tab'],
		// '@typescript-eslint/indent': ['warn', 'tab'],
		// 'no-tabs': ['warn', { allowIndentationTabs: true }],

		'comma-dangle': ['warn', 'always-multiline'], // висячая запятая
		'@typescript-eslint/comma-dangle': ['warn', 'always-multiline'],

		// semi: ['warn', 'always'], // точки с запятой
		// '@typescript-eslint/semi': ['warn', 'always'],

		'i18next/no-literal-string': ['warn', { markupOnly: true }], // переводы внутри [j]tsx // ignoreAttribute: ['data-testid', 'to']

		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/no-unused-vars': 'off', // игнорировать бесполезные объявления

		'@typescript-eslint/ban-ts-comment': 'warn', // предупреждение на @ts-ignore
		'@typescript-eslint/prefer-ts-expect-error': 'warn', // предупреждение на @ts-expect-error

		'react-hooks/exhaustive-deps': 'warn', // зависимости реакт-хуков
		'react-hooks/rules-of-hooks': 'error',

		// 'import/order': [
		// 	// последовательность импорта // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
		// 	'warn',
		// 	{
		// 		groups: [
		// 			'index',
		// 			'sibling',
		// 			'parent',
		// 			'internal',
		// 			'external',
		// 			'builtin',
		// 			'object',
		// 			'type',
		// 		],
		// 		'newlines-between': 'always-and-inside-groups',
		// 	},
		// ],
		'@typescript-eslint/no-invalid-void-type': 'warn', // реакция на void операторы
		'@typescript-eslint/member-delimiter-style': [
			// правило для интерфейсов // https://typescript-eslint.io/rules/member-delimiter-style/
			'warn',
			{
				multiline: {
					delimiter: 'comma',
					requireLast: true,
				},
				singleline: {
					delimiter: 'comma',
					requireLast: true,
				},
				overrides: {
					interface: {
						multiline: {
							delimiter: 'semi',
							requireLast: true,
						},
					},
				},
			},
		],
		// плагин арх-рных правил
		'custom-plugin/layer-imports': [
			'error',
			{ ignoreImportPatterns: ['**/storeProvider.tsx', '**/styleDecorator.ts', 'app/styles/**/*.{css,scss}', 'app/providers/**/*'] },
		],
		// плагин на проверку путей импорта // ['error' , { alias: '@' }]
		'custom-plugin/path-checker': 'error',
		// плагин на проверку импорта из паблика // ['error' , { alias: '@', testFiles: [], publicFile: 'string' }]
		'custom-plugin/public-imports': ['warn', { testFiles: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx'], publicFile: 'public' }],

		// Свалка
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/prefer-nullish-coalescing': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/no-dynamic-delete': 'off',
		'react/display-name': 'off',
	},

	settings: {
		react: {
			version: 'detect',
		},
	},
};

// npx eslint '**/*.{ts,tsx}'
// npx exlint -c .eslintrc --ext .ts,.tsx .
