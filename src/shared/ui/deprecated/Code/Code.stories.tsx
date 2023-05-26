import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { Code } from './Code';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'shared/Code',
	component: Code,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	text:
		'export default {\n' +
		"    title: 'shared/Code',\n" +
		'    component: Code,\n' +
		'    argTypes: {\n' +
		"        backgroundColor: { control: 'color' },\n" +
		'    },\n' +
		'} as ComponentMeta<typeof Code>;\n' +
		'\n' +
		'const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n' +
		'\n' +
		'export const Normal = Template.bind({});',
};
