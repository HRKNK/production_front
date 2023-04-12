import { ListBox } from './ListBox';

import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';
import { themeDecorator } from 'shared/config/storybook/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider/public';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'shared/ListBox',
	component: ListBox,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Green = Template.bind({});
Green.decorators = [
	themeDecorator(Theme.GREEN),
];
Green.args = {
	items: [
		{ value: 'Durward Reynolds', content: 'Durward Reynolds', disabled: false },
		{ value: 'Kenton Towne', content: 'Kenton Towne', disabled: false },
		{ value: 'Therese Wunsch', content: 'Therese Wunsch', disabled: false },
		{ value: 'Benedict Kessler', content: 'Benedict Kessler', disabled: true },
		{ value: 'Katelyn Rohan', content: 'Katelyn Rohan', disabled: false },
	],
	defaultValue: 'Выберите значение',
	label: 'Наименование',
};

export const Dark = Template.bind({});
Dark.decorators = [
	themeDecorator(Theme.DARK),
];
Dark.args = {
	items: [
		{ value: 'Durward Reynolds', content: 'Durward Reynolds', disabled: false },
		{ value: 'Kenton Towne', content: 'Kenton Towne', disabled: false },
		{ value: 'Therese Wunsch', content: 'Therese Wunsch', disabled: false },
		{ value: 'Benedict Kessler', content: 'Benedict Kessler', disabled: true },
		{ value: 'Katelyn Rohan', content: 'Katelyn Rohan', disabled: false },
	],
	defaultValue: 'Выберите значение',
	label: 'Наименование',
};
