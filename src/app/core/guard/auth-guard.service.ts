import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  GuardResult,
  MaybeAsync,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    if (
      typeof window !== 'undefined' &&
      typeof localStorage !== 'undefined' &&
      !localStorage.getItem('accessToken')
    ) {
      alert('You are not allowed to view this page');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
