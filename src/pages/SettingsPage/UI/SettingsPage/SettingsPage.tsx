import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { UiDesignSwitcher } from 'features/uiDesignSwitcher/public';
import { VStack } from 'shared/ui/redesigned/Stack/public';
import { Text } from 'shared/ui/redesigned/Text/public';
import { Page } from 'widgets/Page/Page';

interface SettingsPageProps {
	className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<Page>
			<VStack gap="16">
				{/* Заголовок */}
				<Text title={t('Настройки пользователя')} />
				{/* Фича с настройками */}
				<UiDesignSwitcher />
			</VStack>
		</Page>
	);
});

export default SettingsPage;
