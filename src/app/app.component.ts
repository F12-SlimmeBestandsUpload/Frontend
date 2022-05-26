import {Component, OnInit} from '@angular/core';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public images!: string[];
  public blobImages: Blob[] = [];
  constructor(private sharedService: SharedService) {
    sharedService.changeEmitted$.subscribe((blob: any) => {
      this.blobImages.push(blob)
    });
  } 
}

