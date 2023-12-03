import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthResponse, LoginRequest } from '../models/auth-user.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Load Auth Info': emptyProps(),
    'Load Auth Info Success': props<{ data: AuthResponse }>(),
    'Load Auth Info Failure': props<{ error: unknown }>(),
    'Login User': props<{ data: LoginRequest }>(),
    'Clean State': emptyProps(),
  },
});
