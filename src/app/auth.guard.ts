import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from "./services/shared.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private allowToOverview: boolean | undefined;

  constructor( private route: Router, private sharedService: SharedService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean> |
    Promise<boolean> |
    boolean {
    if (this.sharedService.blobs.length > 0) {
      this.allowToOverview = true;
      return this.allowToOverview;
    } else {
      this.route.navigate(['camera']);
    }
    return true;
  }
}
