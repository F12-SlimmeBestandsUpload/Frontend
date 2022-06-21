import {Component, OnInit} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import {idService} from "../services/id.service";


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public screenWidth = screen.width;
  public videoOptions: MediaTrackConstraints = {
  };
  public errors: WebcamInitError[] = [];


  // Huidige foto die op de sesse is opgeslagen
  public webcamImage: WebcamImage = null as any;
  public blobs!: Blob[]
  // De dataurl van een gemaakt foto
  public imageDataBase!: string;
  // Een foto opgehaald uit de galerij
  public file!: File;
  public fileImageData!: string;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  private router: Router;


  constructor(private sharedService: SharedService, router: Router, idService: idService){

    this.router = router;

  }

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });

    this.blobs = this.sharedService.getBlobs();

    console.log(this.blobs)
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
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

  public removeCameraImage(): void {
    // huidige foto van de sessie word verwijdert en user kan een nieuwe maken.
    this.webcamImage = null as any;
    this.imageDataBase = null as any;
  }

  public removeGaleryImage(): void {
    // huidige foto van de sessie word verwijdert en user kan een nieuwe maken.
    this.file = null as any;
    this.fileImageData = null as any;
  }

public setWidthCamera(): number{

    //Responsiveness van de camera word hier geregeld.

    if(this.screenWidth < 900  && this.screenWidth > 500){

      return 400

    } else if(this.screenWidth < 500){
      return 300
    }else {

      return 500

    }
}

public setHeightCamera(): number {

  //Responsiveness van de camera word hier geregeld.

  if(this.screenWidth < 900 && this.screenWidth > 500){
    return 400

  } else if(this.screenWidth < 500){
    return 300
  }

  else{
    return 500
  }
}

  public addCameraImageToList(): void {

  // Hier moet een foto die gemaakt is met de camera gestuurd worden naar de lijst.

    this.sharedService.addBlob(this.dataURItoBlob(this.imageDataBase));
    this.removeCameraImage();
    this.router.navigate(['overview']);

}

public addGaleryImageToList(): void{

  // Hier moet een foto die geladen is uit de galerij gestuurd worden naar de lijst.

  this.sharedService.addBlob(this.file);
  this.removeGaleryImage();
  this.router.navigate(['overview']);
}


  public dataURItoBlob(imageDataBase: string) {

    // Datauri van een gemaakte foto word hier omgezet naar een blob.

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


  public processImage(imageInput: HTMLInputElement) {
    // Een foto van de galerij word hier geladen.

    const file:  File = imageInput.files![0]
    const reader = new FileReader();

    this.file = file;


    reader.addEventListener('load', (event: any) =>{

      this.fileImageData = event.target.result;

    })

    reader.readAsDataURL(file);
  }


  public cancel() {
    this.removeCameraImage();
    this.removeGaleryImage();

    this.router.navigate(['overview']);
  }
}
