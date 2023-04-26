import { Project } from 'ts-morph';

const project = new Project({});

// Добавить все файлы из корня src
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

// Проверка на абсолютные пути проекта
function isAbsolute (value: string) {
	const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages']; // избавляемся от библиотечных путей
	return layers.some((layer) => value.startsWith(layer));
}

// Итерация по файлам
files.forEach((sourceFile) => {
	// Работа с импортами
	const importDeclarations = sourceFile.getImportDeclarations();
	// Итерация по импортам
	importDeclarations.forEach((importDeclaration) => {
		// Строка с импортом
		const value = importDeclaration.getModuleSpecifierValue();
		// console.log(value);

		if (isAbsolute(value)) {
			// Переопределение на @/
			importDeclaration.setModuleSpecifier(`@/${value}`);
		}
	});
});

void project.save();
