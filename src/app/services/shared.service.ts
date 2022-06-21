import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class SharedService {

  private emitChangeSource = new Subject<any>();
  public blobs: Blob[] = []
  public router: Router;
  public pictureHasBeenMade = false;

  constructor(router: Router) {
    this.router = router;
  }

  addBlob(blob: Blob){
    this.blobs.push(blob)
  }

  getBlobs(){
    return this.blobs;
  }

  deleteBlob(blob: Blob){
    this.blobs.forEach((value,index)=>{
      if(value==blob) this.blobs.splice(index,1);
    });
    if(this.blobs.length == 0){
      this.router.navigate(["camera"])
    }
  }

  changeEmitted$ = this.emitChangeSource.asObservable();
  emitChange(change: any) {
      this.emitChangeSource.next(change);
  }


}
