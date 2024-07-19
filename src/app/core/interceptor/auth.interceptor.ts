import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import { inject } from '@angular/core';
import { environment } from '../../environment/environment';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const isApiUrl = req.url.startsWith(`${environment.backendAuthApiUrl}/sign`);
  if (
    typeof window !== 'undefined' &&
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('accessToken') &&
    !isApiUrl
  ) {
    req = req.clone({
      setHeaders: {
        Authorization: `${localStorage.getItem('accessToken')}`,
      },
    });
  }
  return next(req);
};
