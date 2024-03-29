import { type AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { type AxiosStatic } from 'axios';

import { type StateSchema } from 'app/providers/storeProvider/public';

type ActionCreatorType<Return, Arg, RejectedValue> = (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

export class TestAsyncThunk<Return, Arg, RejectedValue> {
	dispatch: jest.MockedFn<any>; // типы
	getState: () => StateSchema;

	navigate: jest.MockedFn<any>;
	api: jest.MockedFunctionDeep<AxiosStatic>;

	actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

	constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>, state?: DeepPartial<StateSchema>) {
		// state is default (initial state)
		this.actionCreator = actionCreator; // action извне
		this.dispatch = jest.fn(); // мок функции dispatch (any тип)
		this.getState = jest.fn(() => state as StateSchema); // мок функции getState (вернет StateSchema)

		this.api = mockedAxios;
		this.navigate = jest.fn();
	}

	async callThunk(arg: Arg) {
		const action = this.actionCreator(arg); // action извне
		const result = await action(this.dispatch, this.getState, { api: this.api, navigate: this.navigate });
		return result;
	}
}
