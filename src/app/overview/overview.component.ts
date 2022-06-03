import { Component, Input, OnInit } from '@angular/core';
import { ImageAndIndex } from '../shared/model/ImageAndIndex.model'
import { SharedService } from '../services/shared.service';
import { UploadService } from '../services/upload.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  @Input() imageBlobs!: Blob[]
  public selected: ImageAndIndex | undefined;

  constructor(sharedService: SharedService, private uploadService: UploadService) {
    this.imageBlobs = sharedService.getBlobs()
  }

  ngOnInit(): void {
  }

  onSelectHandler(imageAndIndex: ImageAndIndex) {
    this.selected = imageAndIndex;
  }
  removeSelectHandler(){
    this.selected = undefined;
  }
  uploadBlobs(){
    this.uploadService.upload(this.imageBlobs,"string")
  }
}
