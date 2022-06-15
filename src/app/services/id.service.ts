import { Injectable } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Injectable({ providedIn: 'root' })

export class idService {
  private id:string = "";
  constructor(private router: ActivatedRoute, private cookieService: CookieService) {
    this.getIdThroughSubscription().then((string) => {
      this.id = string;
      cookieService.set("id", string);
    })
  }

  async getId(): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => resolve(this.cookieService.get("id")), 180);
    })
  }

  private async getIdThroughSubscription(): Promise<string>{
    return new Promise<string>((resolve) => {
      this.router.queryParams.subscribe(params => {
          if(params["id"]!=undefined) {
            resolve(params["id"]);
          }
        }
      );
    });
  }
}
