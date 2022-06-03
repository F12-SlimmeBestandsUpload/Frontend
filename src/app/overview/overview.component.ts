import { Component, Input, OnInit } from '@angular/core';
import { ImageAndIndex } from '../shared/model/ImageAndIndex.model'
import { SharedService } from '../shared/shared.service';

import { UploadService } from '../upload_service/upload.service';
import { EncryptionService} from "../../encryption-service/encryption.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  @Input() imageBlobs!: Blob[]
  public selected: ImageAndIndex | undefined;


  constructor(private sharedService: SharedService, private uploadService: UploadService,
              private encryptionService: EncryptionService) {

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

  encryptBlob(key: any) {
    return this.encryptionService.encryptEachBlob(key, this.imageBlobs)
  }

  uploadBlobs(){
    let key = this.encryptionService.generateKey().then((valueKey => {
      this.encryptBlob(key).then((value => {
        this.uploadService.upload(value, valueKey)
      }))
    }));
  }
}
