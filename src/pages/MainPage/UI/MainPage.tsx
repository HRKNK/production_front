import { Counter } from 'entities/Counter/public';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { HStack } from 'shared/ui/Stack/public';
import { StarRating } from 'shared/ui/StarRating/StarRating';
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
		<Page>
			{t('Главная')}
			<HStack gap='32'>
				<Counter></Counter>
				<ListBox value={selectedPerson.value} defaultValue='Выберите значение' items={people} onChange={ () => null }></ListBox>
				<StarRating/>
			</HStack>
		</Page>
	);
};

export default MainPage;
