import { type JsxAttribute, type Node, Project, SyntaxKind } from 'ts-morph';

const removedFeatureName = process.argv[2]; // example name: 'isCounterEnabled'
const featureState = process.argv[3]; // example: off\on

/** Пример реализации в файле:
 *
 * 	// Для функции
 * 	const counter = toggleFeatures({
 * 		name: 'isCounterEnabled',
 * 		on: () => <Counter />,
 * 		off: () => <Card>{t('`name` скоро появится!')}</Card>,
 * 	});
 *
 * 	// Для компонента JSX
 * 	<ToggleFeatures feature="isCounterEnabled" on={<Counter />} off={<Card>{t('`name` скоро появится!')}</Card>} />
 *
 */

// Разделение на Функцию/Компонент
const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

// Обработка process.argv
if (!removedFeatureName) throw new Error('Укажите название фича-флага');
if (!featureState) throw new Error('Укажите состояние компонента (on / off)');
if (featureState !== 'on' && featureState !== 'off') throw new Error('Некорректное значение состояния компонента (Валидно: on / off)');

const project = new Project({});

// Добавить все файлы из корня src
// project.addSourceFilesAtPaths('src/**/*.ts');
// project.addSourceFilesAtPaths('src/**/*.tsx');
project.addSourceFilesAtPaths('src/**/ArticleDetailsPage.tsx');

const files = project.getSourceFiles();

// https://astexplorer.net/

function isToggleFunction(node: Node) {
	let isToggleFeatures = false;

	// Итерация по child CallExpression-а
	node.forEachChild((child) => {
		// Ищем - expression: Identifier = $node и сравниваем текст(escapedText) === 'toggleFeatures'
		if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleFunctionName) {
			isToggleFeatures = true;
		}
	});

	return isToggleFeatures;
}

function isToggleComponent(node: Node) {
	/**
	 * Полученный аргумент: node === JsxSelfClosingElement
	 */
	// Получить потомка по типу: Identifier = $node
	const JSXidentifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);
	// JSX тег имя ===  toggleComponentName; (true)
	return JSXidentifier?.getText() === toggleComponentName;
}

// Фильтр массива JSX атрибутов
const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) => {
	return jsxAttributes.find((node) => node.getName() === name);
};

const getReplacedComponent = (attribute?: JsxAttribute) => {
	const value = attribute?.getFirstDescendantByKind(SyntaxKind.JsxExpression)?.getExpression()?.getText();
	if (value?.startsWith('(')) return value.slice(1, -1);
	return value;
};

// Итерация по файлам
files.forEach((sourceFile) => {
	// Итерация по нодам файла
	sourceFile.forEachDescendant((node) => {
		// Ищем - initializer: CallExpression = $node
		if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
			// Получить потомка по типу: ObjectLiteralExpression = $node
			const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

			// Выход из цикла
			if (!objectOptions) return;

			// Получаем свой-ва объекта
			const name = objectOptions.getProperty('name');
			const on = objectOptions.getProperty('on');
			const off = objectOptions.getProperty('off');

			// Отладка
			// console.log(name.getText(), on.getText(), off.getText());

			// Получить потомка по типу: - initializer: ArrowFunction = $node
			const onFunction = on.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
			const offFunction = off.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
			// Удаляем кавычки
			const featureName = name.getFirstDescendantByKind(SyntaxKind.StringLiteral).getText().replace(/'|"/g, ''); // StringLiteral = $node

			// Если не совпадают наименования фича-флага
			if (featureName !== removedFeatureName) return;

			// Удаление куска кода в зависимости от состояния

			/** * Текущая нода === CallExpression
			 **	В replaceWithText аргумент ЗАМЕНЯЕТ весь CallExpression телом onFunction/ArrowFunction
			 ** example: () => { это тело функции }	*/

			if (featureState === 'on') node.replaceWithText(onFunction?.getBody().getText() ?? '');
			if (featureState === 'off') node.replaceWithText(offFunction?.getBody().getText() ?? '');

			console.log(`Внесены изменения по фича-флагу: ${removedFeatureName} [${featureState}]`);
		}

		/**
		 * 	!!! Учитывай способ закрытия JSX элемента = JsxSelfClosingElement
		 * 	<Element/> != <Element></Element>
		 */
		// Ищем - expression: JsxSelfClosingElement = $node && сверяем имя тега текущей ноды с toggleComponentName
		if (node.isKind(SyntaxKind.JsxSelfClosingElement) && node.getTagNameNode().getText() === toggleComponentName) {
			// Получить потомка по типу: - properties: [ JsxAttribute ] = $node // [ массив ]
			const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

			// Ищем конкретные атрибуты в массиве attributes
			const onAttribute = getAttributeNodeByName(attributes, 'on');
			const offAttribute = getAttributeNodeByName(attributes, 'off');
			const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');
			// Удаляем кавычки
			const featureName = featureNameAttribute?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().replace(/'|"/g, ''); // StringLiteral = $node

			// Если не совпадают наименования фича-флага
			if (featureName !== removedFeatureName) return;

			// Удаление куска кода в зависимости от состояния
			const onValue = getReplacedComponent(onAttribute);
			const offValue = getReplacedComponent(offAttribute);

			/** * Текущая нода === JsxSelfClosingElement
			 **	В replaceWithText аргумент ЗАМЕНЯЕТ весь JsxSelfClosingElement телом onValue/offValue
			 ** example: () => { это тело функции }	*/

			if (featureState === 'on' && onValue) node.replaceWithText(onValue);
			if (featureState === 'off' && offValue) node.replaceWithText(offValue);

			console.log(`Внесены изменения по фича-флагу: ${removedFeatureName} [${featureState}]`);
		}
	});
});

void project.save();
