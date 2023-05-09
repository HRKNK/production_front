import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { Flex } from './Flex';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'shared/Flex',
	component: Flex,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});
Row.args = {
	children: (
		<>
			<div>More word</div>
			<div>More word</div>
			<div>More word</div>
			<div>More word</div>
		</>
	),
};

export const RowGap4 = Template.bind({});
RowGap4.args = {
	gap: '4',
	children: (
		<>
			<div>More word</div>
			<div>More word</div>
			<div>More word</div>
			<div>More word</div>
		</>
	),
};
export const RowGap8 = Template.bind({});
RowGap8.args = {
	gap: '8',
	children: (
		<>
			<div>more word</div>
			<div>more word</div>
			<div>more word</div>
			<div>more word</div>
		</>
	),
};

export const RowGap16 = Template.bind({});
RowGap16.args = {
	gap: '16',
	children: (
		<>
			<div>more word</div>
			<div>more word</div>
			<div>more word</div>
			<div>more word</div>
		</>
	),
};

export const Column = Template.bind({});
Column.args = {
	direction: 'column',
	children: (
		<>
			<div>more word</div>
			<div>more word</div>
			<div>more word</div>
			<div>more word</div>
		</>
	),
};

export const ColumnGap16 = Template.bind({});
ColumnGap16.args = {
	gap: '16',
	direction: 'column',
	children: (
		<>
			<div>more word</div>
			<div>more word</div>
			<div>more word</div>
			<div>more word</div>
		</>
	),
};

export const ColumnAlignEnd = Template.bind({});
ColumnAlignEnd.args = {
	direction: 'column',
	align: 'end',
	children: (
		<>
			<div>more word</div>
			<div>more word</div>
			<div>more word</div>
			<div>more word</div>
		</>
	),
};
