import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

    constructor(
        private http: HttpClient,
    ) { }

    upload(blobs: Blob[], id: string, key: string) : Observable<any> {
        let formData = UploadService.convertBlobsToFormData(blobs);
        formData.append("id", id);
        formData.append("key", key);
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
