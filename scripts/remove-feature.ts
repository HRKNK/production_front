import { type Node, Project, SyntaxKind } from 'ts-morph';

const removedFeatureName = process.argv[2]; // example name: 'isCounterEnabled'
const featureState = process.argv[3]; // example: off\on

/** Пример реализации в файле:
 *
 * 	const counter = toggleFeatures({
 * 		name: 'isCounterEnabled',
 * 		on: () => <CounterRedesigned />,
 * 		off: () => <Counter />,
 * 	});
 *
 */

// Обработка process.argv
if (!removedFeatureName) throw new Error('Укажите название фича-флага');
if (!featureState) throw new Error('Укажите состояние компонента (on / off)');
if (featureState !== 'on' && featureState !== 'off') throw new Error('Некорректное значение состояния компонента (Валидно: on / off)');

const project = new Project({});

// Добавить все файлы из корня src
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');
// project.addSourceFilesAtPaths('src/**/ArticleDetailsPage.tsx');

const files = project.getSourceFiles();

// https://astexplorer.net/

function isToggleFunction(node: Node) {
	let isToggleFeatures = false;

	// Итерация по child CallExpression-а
	node.forEachChild((child) => {
		// Ищем - expression: Identifier = $node и сравниваем текст(escapedText) === 'toggleFeatures'
		if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
			isToggleFeatures = true;
		}
	});

	return isToggleFeatures;
}

// Итерация по файлам
files.forEach((sourceFile) => {
	// Итерация по нодам файла
	sourceFile.forEachDescendant((node) => {
		// Ищем - initializer: CallExpression = $node
		if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
			// Получить первого потомка по типу: ObjectLiteralExpression = $node
			const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

			// Выход из цикла
			if (!objectOptions) return;

			// Получаем свой-ва объекта
			const name = objectOptions.getProperty('name');
			const on = objectOptions.getProperty('on');
			const off = objectOptions.getProperty('off');

			// Отладка
			// console.log(name.getText(), on.getText(), off.getText());

			// Получить первого потомка по типу: - initializer: ArrowFunction = $node
			const onFunction = on.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
			const offFunction = off.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
			const featureName = name.getFirstDescendantByKind(SyntaxKind.StringLiteral).getText().replace(/'/g, ''); // StringLiteral = $node

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
	});
});

void project.save();
