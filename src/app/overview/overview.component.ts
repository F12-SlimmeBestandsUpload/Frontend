import { Component, Input, OnInit } from '@angular/core';
import { ImageAndIndex } from '../shared/model/ImageAndIndex.model'
import { SharedService } from '../services/shared.service';
import { UploadService } from '../services/upload.service';
import { EncryptionService} from "../../encryption-service/encryption.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  @Input() imageBlobs!: Blob[]
  public selected: ImageAndIndex | undefined;


  constructor(
    private sharedService: SharedService,
    private uploadService: UploadService,
    private encryptionService: EncryptionService,
    private router: Router
  ) {

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

  async uploadBlobs(){
    let key = await this.encryptionService.generateKey();
    let blobs = await this.encryptBlob(key);
    let base64Key = await this.encryptionService.keyToBase64(key);

    console.log(blobs);
    this.uploadService.upload(blobs, base64Key).subscribe();
    await this.router.navigate(['end']);
  }
}
