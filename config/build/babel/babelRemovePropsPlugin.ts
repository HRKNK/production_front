import { type PluginItem } from '@babel/core';

// https://babeljs.io/docs/plugins/#plugin-development
// https://astexplorer.net/

export default function (): PluginItem {
	return {
		visitor: {
			Program (path, state) {
				const forbidden = state.opts.props || []; // массив атрибутов (пропсы)

				path.traverse({ // проход по всем нодам дерева
					JSXIdentifier (current) { // JSXIdentifier - тип ноды (из AST)
						const nodeName = current.node.name; // имя ноды (data-testid)

						if (forbidden.includes(nodeName)) { // удаляем атрибут
							current.parentPath.remove();
						}
					},
				});
			},
		},
	};
}
