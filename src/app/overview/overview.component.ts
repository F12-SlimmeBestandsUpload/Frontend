import { Component, Input, OnInit } from '@angular/core';
import { ImageAndIndex } from '../shared/model/ImageAndIndex.model'
import { SharedService } from '../services/shared.service';
import { UploadService } from '../services/upload.service';
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

  async uploadBlobs(){
    let key = await this.encryptionService.generateKey();
    let blobs = await this.encryptBlob(key);
    console.log(await blobs[0].arrayBuffer())
    let base64Key = await this.encryptionService.keyToBase64(key);
    let decryptedBlob = await this.encryptionService.decrypt(key, await (await this.encryptBlob(key))[0].arrayBuffer());
    decryptedBlob = new Blob([new Uint8Array(decryptedBlob)])
    decryptedBlob = decryptedBlob.slice(0, decryptedBlob.size, "image/jpeg")

    this.sharedService.addBlob(decryptedBlob);


    (await this.uploadService.upload(blobs, base64Key)).subscribe();
  }
}
