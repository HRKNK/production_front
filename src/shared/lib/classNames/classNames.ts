// Аналог библиотека: https://www.npmjs.com/package/classnames

// Record специальный ТС класс, который указывает Ключ(строка) + Свойство (бул/строка)
type Mods = Record<string, boolean | string>;

export default function classNames (cls: string, mods: Mods = {}, additional: string[] = []): string { //  additional:  Array<string | undefined>
	return [cls, ...additional.filter(Boolean),
		...Object.entries(mods).filter(([key, value]) => Boolean(value)).map(([key]) => key),
	].join(' ');
};

classNames('remove-btn', { hovered: true, selectable: true, red: true }, ['pdg']);
