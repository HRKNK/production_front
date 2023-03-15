import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export const $api = axios.create({
	// baseURL: 'http://localhost:8000',
	baseURL: _API,
	headers: {
		authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
	},
});
