import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../models/user.model';

export const userFeatureKey = 'user';

export interface State {
  users: User[] | null;
  user: User | null;
  isLoading: boolean;
  error: unknown;
}

const initialState: State = {
  users: null,
  user: null,
  isLoading: false,
  error: undefined,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({ ...state, isLoading: true })),
  on(UserActions.loadUsersSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    users: data,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(UserActions.loadUser, (state) => ({ ...state, isLoading: true })),
  on(UserActions.loadUserSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    user: data,
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(UserActions.createUser, (state) => ({ ...state, isLoading: true })),
  on(UserActions.updateUser, (state) => ({ ...state, isLoading: true })),
  on(UserActions.deleteUser, (state) => ({ ...state, isLoading: true }))
);
