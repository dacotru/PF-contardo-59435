import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: any }>(),

    'Create User': props<{ user: User }>(),
    'Create User Success': props<{ user: User }>(),
    'Create User Failure': props<{ error: any }>(),

    'Edit User': props<{ user: User }>(),
    'Edit User Success': props<{ user: User }>(),
    'Edit User Failure': props<{ error: any }>(),

    'Delete User': props<{ id: string }>(),
    'Delete User Success': props<{ id: string }>(),
    'Delete User Failure': props<{ error: any }>(),
  },
});
