import { user } from './objects';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    
      const validLogin = JSON.parse(localStorage.getItem('validLogin') || '{}') as string;
      if(validLogin){
        return true
      }
      else{
        this._router.navigate(['login']);
        return false;
      }
  }
  
}
