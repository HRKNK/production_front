import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'shared/lib/classNames/classNames';
import { useDevice } from 'shared/lib/hooks/useDevice/useDevice';
import { Button, ButtonSize, ThemeButton } from 'shared/ui/deprecated/Button/public';
import { Card } from 'shared/ui/deprecated/Card/public';
import { Input } from 'shared/ui/deprecated/Input/public';
import { StarRating } from 'shared/ui/deprecated/StarRating/public';
import { Text } from 'shared/ui/deprecated/Text/public';
import { Drawer } from 'shared/ui/redesigned/Drawer/public';
import { Modal } from 'shared/ui/redesigned/Modal/public';
import { HStack, VStack } from 'shared/ui/redesigned/Stack/public';

interface RatingCardProps {
	className?: string;
	title?: string; // заголовок над звездами
	feedbackTitle?: string; // заголовок отзыва(фидбек)
	hasFeedback?: boolean; // оставить отзыв (фидбек)?
	onCancel?: (starsCount: number) => void; // отмена отправки
	onAccept?: (starsCount: number, feedback?: string) => void; // отправить отзыв
	rate?: number; // сколько звезд выбрано?
}

// eslint-disable-next-line react/display-name
export const RatingCard = memo((props: RatingCardProps) => {
	const { className, onAccept, feedbackTitle, hasFeedback, onCancel, title, rate = 0 } = props;
	const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState(false); // состояние модалки
	const [starsCount, setStarsCount] = useState(rate); // установленные звезды
	const [feedback, setFeedback] = useState(''); // связывание с инпутом

	const onSelectStars = useCallback(
		(selectedStarsCount: number) => {
			setStarsCount(selectedStarsCount);
			if (hasFeedback) {
				setIsModalOpen(true);
			} else {
				onAccept?.(selectedStarsCount);
			}
		},
		[hasFeedback, onAccept]
	);

	const acceptHandle = useCallback(() => {
		setIsModalOpen(false);
		onAccept?.(starsCount, feedback);
	}, [feedback, onAccept, starsCount]);

	const cancelHandle = useCallback(() => {
		setIsModalOpen(false);
		onCancel?.(starsCount);
	}, [onCancel, starsCount]);

	const isMobileView = useDevice(); // вид мобильного варианта

	const modalContent = (
		<>
			<Text title={feedbackTitle} />
			<Input data-testid="RatingCard.Input" value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')} />
		</>
	);

	return (
		<Card data-testid="RatingCard" max className={classNames('', {}, [className])}>
			<VStack align="center" gap="8">
				<Text title={starsCount ? t('Спасибо за оценку!') : title} />
				{/* Компонент звезд */}
				<StarRating size={40} onSelect={onSelectStars} selectedStars={starsCount} />
			</VStack>

			{isMobileView ? (
				<>
					{/* Мобильная версия */}
					<Drawer
						isOpen={isModalOpen} // lazy
						onClose={cancelHandle}
					>
						<VStack gap="32">
							{modalContent}
							<Button // fullWidth
								onClick={acceptHandle}
								size={ButtonSize.L}
							>
								{t('Отправить')}
							</Button>
						</VStack>
					</Drawer>
				</>
			) : (
				<Modal isOpen={isModalOpen} lazy>
					{' '}
					{/* Декстопная версия */}
					<VStack max gap="32">
						{modalContent}
						<HStack max gap="16" justify="end">
							<Button data-testid="RatingCard.Close" onClick={cancelHandle} theme={ThemeButton.OUTLINE_RED}>
								{t('Закрыть')}
							</Button>
							<Button data-testid="RatingCard.Send" onClick={acceptHandle}>
								{t('Отправить')}
							</Button>
						</HStack>
					</VStack>
				</Modal>
			)}
		</Card>
	);
});
