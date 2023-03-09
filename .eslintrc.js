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
	],
	overrides: [
		// исключение
		{
			files: ['**/src/**/*.{test,stories}.{ts,tsx,js,jsx}'],
			rules: {
				'i18next/no-literal-string': 'off', // отключить переводы внутри test.[j]tsx
				'max-len': 'off',
			},
		}],

	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json'],
	},
	plugins: ['react', 'i18next', 'react-hooks'],
	rules: {
		'no-console': 'warn', // варнинги на консоль в коде

		quotes: ['warn', 'single'], // правило кавычек (single ? double)
		'jsx-quotes': ['warn', 'prefer-single'], // правило кавычек для jsx (prefer-single ? prefer-single)

		'prefer-const': 'error', // использование констант для неизменяемых переменных
		'max-len': ['error', { code: 200, ignoreComments: true }], // максимальная длина строки + правило игнорирует комментарии

		indent: ['warn', 'tab'], // отступы
		'react/jsx-indent': ['warn', 'tab'],
		'@typescript-eslint/indent': ['warn', 'tab'],
		'no-tabs': ['warn', { allowIndentationTabs: true }],

		'comma-dangle': ['warn', 'always-multiline'], // висячая запятая
		'@typescript-eslint/comma-dangle': ['warn', 'always-multiline'],

		semi: ['warn', 'always'], // точки с запятой
		'@typescript-eslint/semi': ['warn', 'always'],

		'i18next/no-literal-string': ['warn', { markupOnly: true }], // переводы внутри [j]tsx // ignoreAttribute: ['data-testid', 'to']

		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/no-unused-vars': 'off', // игнорировать бесполезные объявления

		'import/order': [ // последовательность импорта // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
			'error', {
				groups: ['index', 'sibling', 'parent', 'internal', 'external', 'builtin', 'object', 'type'],
				'newlines-between': 'always-and-inside-groups',
			}],
		'@typescript-eslint/member-delimiter-style': [ // правило для интерфейсов // https://typescript-eslint.io/rules/member-delimiter-style/
			'warn', {
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
			}],
		'@typescript-eslint/explicit-function-return-type': 'off',
		//
		'@typescript-eslint/prefer-nullish-coalescing': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/no-dynamic-delete': 'off',

		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
	},

	settings: {
		react: {
			version: 'detect',
		},
	},
};

// npx eslint '**/*.{ts,tsx}'
// npx exlint -c .eslintrc --ext .ts,.tsx .
