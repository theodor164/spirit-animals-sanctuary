import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = this.authService.getToken();

    if (!token) {
      return this.router.parseUrl('/login');
    }

    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp * 1000; // JWT exp is in seconds, convert to ms
      if (Date.now() > exp) {
        this.authService.logout();
        return this.router.parseUrl('/login');
      }
      return true;
    } catch (e) {
      return this.router.parseUrl('/login');
    }
  }
}
