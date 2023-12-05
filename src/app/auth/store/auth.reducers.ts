import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthResponse } from '../models/auth-user.model';

export const authFeatureKey = 'auth';

export interface State {
  authInfo: AuthResponse | null;
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  authInfo: null,
  isLoading: false,
  error: undefined,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loadAuthInfo, (state) => ({ ...state, isLoading: true })),
  on(AuthActions.loadAuthInfoSuccess, (state, action) => ({
    error: null,
    isLoading: false,
    authInfo: action.data,
  })),
  on(AuthActions.loadAuthInfoFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(AuthActions.cleanState, () => {
    localStorage.clear();
    return initialState;
  })
);
