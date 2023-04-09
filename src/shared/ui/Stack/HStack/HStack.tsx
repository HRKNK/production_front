import { Flex, type FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>; // Omit исключает поле direction

export const HStack = (props: HStackProps) => {
	return (
		<Flex direction='row' {...props} />
	);
};
