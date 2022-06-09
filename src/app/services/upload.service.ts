import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment.prod";
import { idService } from './id.service';
import {EncryptionService} from "../../encryption-service/encryption.service";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
    public id!: string;
    constructor(private http: HttpClient,private idService:idService, private encryptionService: EncryptionService) {
        this.idService.getId().then(id =>{
          console.log(id)
            this.id = id;
        })
     }

    async upload(blobs: Blob[], key: string) : Promise<Observable<any>> {
        let formData = UploadService.convertBlobsToFormData(blobs);
        formData.append("id", this.id);
        formData.append("key", key);
        formData.forEach(value => console.log(value))
        return this.http.post(
            `${environment.upload_host}/upload`,
            formData,
        )
    }

    private static convertBlobsToFormData(blobs: Blob[]) : FormData {
        let formData = new FormData();
        for (let blob of blobs) {
          formData.append("photos", blob);
        }

        return formData;
    }
}
