import path from 'path';
import { Project } from 'ts-morph';

const project = new Project({});

// TODO можно в процесс закинуть определение
const publicFileName = 'public';

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();
const sharedUiDirectory = project.getDirectory(path.resolve(__dirname, '..', 'src', 'shared', 'ui')); // селект UI папки
const directories = sharedUiDirectory?.getDirectories(); // UI папки в виде массива

// Проверка на абсолютные пути проекта
function isAbsolute(value: string) {
	const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages']; // избавляемся от библиотечных путей
	return layers.some((layer) => value.startsWith(layer));
}

directories?.forEach((directory) => {
	// console.log(directory.getBaseName()); // логи с названием папок
	const folderName = directory.getPath();

	const isIndexFileExist = `${folderName}/${publicFileName}.ts`; // путь до Public API
	const indexFile = directory.getSourceFile(isIndexFileExist);

	if (!indexFile) {
		// если Public API нет
		const sourceCode = `export * from './${directory.getBaseName()}';\n`; // код, который необходимо записать в файл (экспортировать всё из file.name)
		const file = directory.createSourceFile(isIndexFileExist, sourceCode, { overwrite: false }); // путь до файла, внедрение, опции: перезапись файла
		void file.save().then(() => {
			console.log(`${folderName} --> ${publicFileName}.ts created!`);
		});
	}
});

// Итерация по файлам
files.forEach((sourceFile) => {
	const importDeclarations = sourceFile.getImportDeclarations(); // Работа с импортами

	// Итерация по импортам
	importDeclarations.forEach((importDeclaration) => {
		const value = importDeclaration.getModuleSpecifierValue(); // Строка с импортом
		const valueWithoutAlias = value.replace('@/', ''); // Удаляем алиас (если есть)

		const segments = valueWithoutAlias.split('/'); // ['shared', 'ui']
		const isSharedLayer = segments?.[0] === 'shared';
		const isUiSlice = segments?.[1] === 'ui';

		if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
			const cutUiPath = valueWithoutAlias.split('/').slice(0, 3); // shared > ui > icon > icon => shared > ui > icon (избавились от последнего)
			cutUiPath.push(publicFileName); // кладем в массив кастомное имя паблик апи
			const result = cutUiPath.join('/');
			importDeclaration.setModuleSpecifier(`${result}`); // @/${result}
		}
	});
});

void project.save().then(() => {
	console.log('\n\nScript completed!');
});
