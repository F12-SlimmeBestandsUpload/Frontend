import { Component, Input, OnInit } from '@angular/core';
import { ImageAndIndex } from '../shared/model/ImageAndIndex.model'
import { SharedService } from '../services/shared.service';
import { UploadService } from '../services/upload.service';
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
    // this.encryptionService.encrypt("awkwardly", this.encryptionService.eachBlobInArray());
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
