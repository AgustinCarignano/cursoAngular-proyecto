import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Professor } from '../models';

export const ProfessorActions = createActionGroup({
  source: 'Professor',
  events: {
    'Load Professors': emptyProps(),
    'Load Professors Success': props<{ data: Professor[] }>(),
    'Load Professors Failure': props<{ error: unknown }>(),
    'Load Professor': props<{ professorId: number }>(),
    'Load Professor Success': props<{ data: Professor }>(),
    'Load Professor Failure': props<{ error: unknown }>(),
    'Create Professor': props<{ professor: Professor }>(),
    'Update Professor': props<{ professor: Professor }>(),
    'Delete Professor': props<{ professorId: number }>(),
  },
});
