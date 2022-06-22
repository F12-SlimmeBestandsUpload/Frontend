import {ComponentFixture, TestBed} from '@angular/core/testing';

import { CameraComponent } from './camera.component';
import {Router, RouterModule} from "@angular/router";
import {SharedService} from "../services/shared.service";
import {WebcamImage} from "ngx-webcam";

describe('CameraComponent', () => {
  let component: CameraComponent;
  let id:Number = 123123;
  let router:Router;
  let sharedService: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      providers: [CameraComponent, SharedService]
    });
    router = TestBed.inject(Router);
    component = TestBed.inject(CameraComponent);
    sharedService = TestBed.inject(SharedService);

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should handle an image from the camera', ()=>{

    // @ts-ignore
    let webcamimagemock = new WebcamImage("", "", undefined)

    component.handleImage(webcamimagemock)

    expect(component.webcamImage).toEqual(webcamimagemock)
    expect(component.imageDataBase).toEqual(webcamimagemock.imageAsDataUrl)
  })


  it('should have null values for both a file and camera image after the cancel() method is called ', ()=>{

    component.imageDataBase = "Not Null";
    component.fileImageData = "Not Null"

    component.cancel();

    expect(component.imageDataBase).toBeNull();
    expect(component.imageDataBase).toBeNull();

  })

});
