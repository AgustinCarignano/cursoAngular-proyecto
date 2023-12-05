import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEdition from '../reducers/edition.reducer';

export const selectEditionState =
  createFeatureSelector<fromEdition.EditionState>(
    fromEdition.editionFeatureKey
  );

export const selectEditions = createSelector(
  selectEditionState,
  (state) => state.editions
);

export const selectCourseEditions = createSelector(
  selectEditionState,
  (state) => state.courseEditions
);

export const selectEdition = createSelector(
  selectEditionState,
  (state) => state.edition
);

export const selectIsLoadingEditions = createSelector(
  selectEditionState,
  (state) => state.isLoading
);

export const selectHasErrorEditions = createSelector(
  selectEditionState,
  (state) => state.error
);
