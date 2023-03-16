import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly, profileActions, ProfileCard, profileReducer } from 'entities/Profile/public';
import classNames from 'shared/lib/classNames/classNames';
import { useCallback, useEffect } from 'react';
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

	const formData = useSelector(getProfileForm);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readOnly = useSelector(getProfileReadonly);

	useEffect(() => {
		void dispatch(fetchProfileData());
	}, [dispatch]);

	const onChangeFirstname = useCallback((value?: string) => {
		dispatch(profileActions.updateProfileData({ first: value || '' }));
	}, [dispatch]);

	const onChangeLastname = useCallback((value?: string) => {
		dispatch(profileActions.updateProfileData({ lastname: value || '' }));
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames('', {}, [className])}>
				<ProfilePageHeader></ProfilePageHeader>
				<ProfileCard
					onChangeFirstname={onChangeFirstname}
					onChangeLastname={onChangeLastname}
					data={formData}
					isLoading={isLoading}
					error={error}
					readonly={readOnly}
				/>
			</div>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
