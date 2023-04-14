import { useParams } from 'react-router-dom';
import { EditableProfileCard } from 'features/editableProfileCard/public';
import { Text } from 'shared/ui/Text/public';
import { useTranslation } from 'react-i18next';
import classNames from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack/public';
import { Page } from 'widgets/Page/Page';

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
	const { id } = useParams<{ id: string, }>(); // Обработчик возвращает объект из пар ключ-значение динамических параметров из текущего URL-адреса
	const { t } = useTranslation('profile');

	if (!id) {
		return <Text text={t('Профиль не найден')}></Text>;
	}

	return (
		<Page className={classNames('', {}, [className])}>
			<VStack gap='16' max>
				<EditableProfileCard id={id} />
			</VStack>
		</Page>
	);
};

export default ProfilePage;
