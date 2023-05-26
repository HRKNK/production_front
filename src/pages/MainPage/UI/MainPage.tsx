import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Counter } from 'entities/Counter/public';
import { RatingCard } from 'entities/Rating/public';
import { ListBox } from 'shared/ui/deprecated/ListBox/public';
import { HStack } from 'shared/ui/redesigned/Stack/public';
import { Page } from 'widgets/Page/Page';

const MainPage = () => {
	const { t } = useTranslation('main');

	const people = [
		{ id: '1', value: 'Durward Reynolds', content: 'Durward Reynolds', disabled: false },
		{ id: '2', value: 'Kenton Towne', content: 'Kenton Towne', disabled: false },
		{ id: '3', value: 'Therese Wunsch', content: 'Therese Wunsch', disabled: false },
		{ id: '4', value: 'Benedict Kessler', content: 'Benedict Kessler', disabled: true },
		{ id: '5', value: 'Katelyn Rohan', content: 'Katelyn Rohan', disabled: false },
	];

	const [selectedPerson, setSelectedPerson] = useState(people[0]);

	return (
		<Page data-testid={'MainPage'}>
			{t('Главная')}
			<HStack gap="32">
				<Counter></Counter>
				<ListBox value={selectedPerson.value} defaultValue="Выберите значение" items={people} onChange={() => null}></ListBox>
				<RatingCard hasFeedback title="Как вам статья?" feedbackTitle="Оставьте отзыв" />
			</HStack>
		</Page>
	);
};

export default MainPage;
