import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  (state) => state.users
);

export const selectIsLoading = createSelector(
  selectUsersState,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectUsersState,
  (state) => state.error
);


