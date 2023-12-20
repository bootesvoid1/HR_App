import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.authenticated()) {
      console.log('AUTH GUARD PASSED');
      return true;
    } else {
      console.log('BLOCKED BY AUTH GUARD');
      this.router.navigate(['certificate']);
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Check if the user is an admin
    if (this.auth.isAdmin()) {
      console.log('AUTH GUARD (Child) PASSED - User is an admin');
      return true;
    } else {
      console.log('BLOCKED BY AUTH GUARD (Child) - User is not an admin');
      this.router.navigate(['certificate']); // You can redirect to another page for non-admin users
      return false;
    }
  }
}
