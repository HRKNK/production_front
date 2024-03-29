import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { AvatarDropdown } from './AvatarDropdown';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'features/AvatarDropdown',
	component: AvatarDropdown,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => <AvatarDropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
