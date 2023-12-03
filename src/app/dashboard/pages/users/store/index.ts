import { ActionReducerMap } from '@ngrx/store';
import { userFeatureKey, State, reducer as userReducer } from './user.reducer';
export * from './user.actions';
export * from './user.reducer';
export * from './user.selects';

export interface UserState {
  [userFeatureKey]: State;
}

export const reducers: ActionReducerMap<UserState> = {
  [userFeatureKey]: userReducer,
};
