import type React from 'react';

export interface SidebarItemType {
	path: string;
	Icon: React.VFC<React.SVGProps<SVGSVGElement>>; // SVG type из глобал тс
	text: string;
	authOnly?: boolean;
}
