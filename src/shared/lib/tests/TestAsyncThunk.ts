import { type AsyncThunkAction } from '@reduxjs/toolkit';
import { type StateSchema } from 'app/providers/storeProvider/public';

type ActionCreatorType<Return, Arg, RejectedValue>
    = (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue, }>;

export class TestAsyncThunk<Return, Arg, RejectedValue> {
	dispatch: jest.MockedFn<any>; // типы
	getState: () => StateSchema;

	actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

	constructor (actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
		this.actionCreator = actionCreator; // action извне
		this.dispatch = jest.fn(); // мок функции dispatch (any тип)
		this.getState = jest.fn(); // мок функции getState (вернет StateSchema)
	}

	async callThunk (arg: Arg) {
		const action = this.actionCreator(arg); // action извне
		const result = await action(this.dispatch, this.getState, undefined);
		return result;
	}
}
