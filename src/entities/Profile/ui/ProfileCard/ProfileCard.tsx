import { type Country } from 'entities/Country/public';
import { type Currency } from 'entities/Currency/public';
import { ToggleFeatures } from 'shared/lib/features/public';

import { type Profile } from '../../model/types/profile';
import { ProfileCardDeprecated } from '../ProfileCardDeprecated/ProfileCardDeprecated';
import { ProfileCardRedesign } from '../ProfileCardRedesign/ProfileCardRedesign';

export interface ProfileCardProps {
	className?: string;
	data?: Profile;
	isLoading?: boolean;
	error?: string;
	readonly?: boolean;
	onChangeFirstname?: (value?: string) => void;
	onChangeLastname?: (value?: string) => void;
	onChangeCity?: (value?: string) => void;
	onChangeAge?: (value?: string) => void;
	onChangeUserName?: (value?: string) => void;
	onChangeAvatar?: (value?: string) => void;
	onChangeCountry?: (country: Country) => void;
	onChangeCurrency?: (currency: Currency) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
	return <ToggleFeatures feature={'isAppRedesigned'} on={<ProfileCardRedesign {...props} />} off={<ProfileCardDeprecated {...props} />} />;
};
