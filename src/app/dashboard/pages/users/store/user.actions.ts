import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: User[] }>(),
    'Load Users Failure': props<{ error: unknown }>(),
    'Load User': props<{ userId: number }>(),
    'Load User Success': props<{ data: User }>(),
    'Load User Failure': props<{ error: unknown }>(),
    'Create User': props<{ user: User }>(),
    'Update User': props<{ user: User }>(),
    'Delete User': props<{ userId: number }>(),
  },
});
