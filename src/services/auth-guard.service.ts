import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth-service.service";

@Injectable()
export class AuthGuard implements CanActivate {

        constructor(private authService: AuthService ){}
    
        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
           return this.authService.isAuthenticated();
        }

    
}
