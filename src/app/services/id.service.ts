import { Injectable } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Injectable({ providedIn: 'root' })

export class idService {
  private id:string = "";

  constructor(private router: ActivatedRoute) {

    this.getIdThroughSubscription().then((string) => {
      this.id = string;
    })
  }

  async getId(): Promise<string> {
    return new Promise<string>((resolve) => {
      if (this.id!="") {
        resolve(this.id);
      }
      this.getIdThroughSubscription().then((string) => {
        resolve(string!);
      })
    })
  }

  async getIdThroughSubscription(): Promise<string>{
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
