import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, user } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let result: boolean = true;
      this.auth.checkAuth().then(response => {
        if (response) {
          console.log('checkAuth response: ', response);
          console.log('route: ', route);
          result = true;
        } else {
          console.log('checkAuth: ', response);
          this.navigate();
          result = false;
        }
      })
      .catch(e => {
        console.log('checkAuth error: ', e);
        this.navigate();
        result = false;
      })
      return result;
  }
  
  navigate() {
    this.router.navigateByUrl('/auth-screen', {replaceUrl: true});
  }
}
