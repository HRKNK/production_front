import { memo } from 'react';

import { Skeleton } from 'shared/ui/redesigned/Skeleton/Skeleton';
import { HStack, VStack } from 'shared/ui/redesigned/Stack/public';

import { MainLayout } from '../MainLayout/MainLayout';
import cls from './AppLoaderLayout.module.scss';

export const AppLoaderLayout = memo(() => {
	return (
		<MainLayout
			header={
				// header loader
				<HStack className={cls.header}>
					<Skeleton width={40} height={40} border="50%" />
				</HStack>
			}
			content={
				// content loader
				<VStack gap="16" className={cls.content}>
					<Skeleton width="70%" height={32} border="16px" />
					<Skeleton width="40%" height={20} border="16px" />
					<Skeleton width="50%" height={20} border="16px" />
					<Skeleton width="30%" height={32} border="16px" />
					<Skeleton width="80%" height="40%" border="16px" />
					<Skeleton width="80%" height="40%" border="16px" />
				</VStack>
			}
			// sidebar loader
			sidebar={<Skeleton border="32px" width={220} height="100%" />}
		/>
	);
});
