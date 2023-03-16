import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchProfileData, getProfileData, getProfileError, getProfileIsLoading, ProfileCard, profileReducer } from 'entities/Profile/public';
import classNames from 'shared/lib/classNames/classNames';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { useSelector } from 'react-redux';

const reducers: ReducersList = {
	profile: profileReducer,
};

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const data = useSelector(getProfileData);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);

	useEffect(() => {
		void dispatch(fetchProfileData());
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames('', {}, [className])}>
				<ProfileCard data={data} isLoading={isLoading} error={error}/>
			</div>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
