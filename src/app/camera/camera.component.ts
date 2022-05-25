import { Component, OnInit } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // Huidige foto die op de sesse is opgeslagen
  public webcamImage: WebcamImage = null as any;

  public imageDataBase!: string;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // Om te switchen naar andere camera. Niet zeker of eht nuttig is.
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  public router: Router;

  constructor(private sharedService: SharedService, router: Router){
    this.router = router;

  }

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    //Om camera uit en aan te zetten. Niet zeker of het nuttig is.
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // om te switchen tussen voor en achter camera. Niet zeker of dit nuttig is dus wacht ff met uitwerken.
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.imageDataBase = webcamImage.imageAsDataUrl;
  }


  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  public removeImage(): void {
    // huidige foto van de sessie word verwijdert en user kan een nieuwe maken.
    this.webcamImage = null as any;
  }

  public addToImageList(): void {
  // Hier moet de camera gesloten worden en de foto doorgegeven worden aan de lijst.
  this.sharedService.addBlob(this.dataURItoBlob(this.imageDataBase))
  this.router.navigate(['overview']);

}

  public dataURItoBlob(imageDataBase: string) {

    const byteString = atob(imageDataBase.split(',')[1]);

    const mimeString = imageDataBase.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);

    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    const blob = new Blob([ab], {type: mimeString});
    return blob;
  }
}
