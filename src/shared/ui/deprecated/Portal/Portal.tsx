import React, { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

// https://reactjs.org/docs/portals.html
interface PortalProps {
	children?: ReactNode; // что переносим
	element?: HTMLElement; // куда переносим
}

/**
 * @deprecated Устарело, используйте новый компонент редизайна
 */
const Portal = (props: PortalProps) => {
	const { children, element = document.body } = props;

	return createPortal(children, element);
};

export default Portal;
