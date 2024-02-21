import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../pages/auth/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const accessToken = authService.getAccessToken();

  if (accessToken) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    });
    return next(clonedReq);
  }

  return next(req);
};
