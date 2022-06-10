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

  encryptBlob(iv: Uint8Array, key: any) {
    return this.encryptionService.encryptEachBlob(iv, key, this.imageBlobs)
  }

  async uploadBlobs(){
    let key = await this.encryptionService.generateKey();
    let iv = this.encryptionService.generateIv();
    let blobs = await this.encryptBlob(iv, key);
    console.log(await blobs[0].arrayBuffer())
    let jwk = await this.encryptionService.keyToJwkJson(key);
    let jsonIv = this.encryptionService.ivToJsonArray(iv);
    this.uploadService.upload(blobs, jsonIv, jwk).subscribe();
    // await this.router.navigate(['end']);
  }
}
