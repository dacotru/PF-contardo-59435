import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verifyToken().pipe(
    map((isValid) => {
      return isValid || router.createUrlTree(['/auth/login']);
    }),
    catchError((error) => {
      return of(router.createUrlTree(['/auth/login']));
    })
  );
};
