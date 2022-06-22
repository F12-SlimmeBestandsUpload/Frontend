import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from "./services/shared.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private allowToOverview: boolean = this.sharedService.pictureHasBeenMade;

  constructor( private route: Router, private sharedService: SharedService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean> |
    Promise<boolean> |
    boolean {
    if (!this.allowToOverview) {
      this.route.navigate(['']);
    }
    return this.allowToOverview;
  }
}
