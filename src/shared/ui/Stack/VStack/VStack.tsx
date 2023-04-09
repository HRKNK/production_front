import { Flex, type FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>; // Omit исключает поле direction

export const VStack = (props: VStackProps) => {
	const { align = 'start' } = props;
	return (
		<Flex {...props} direction='column' align={align} />
	);
};
