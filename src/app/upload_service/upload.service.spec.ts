import { TestBed } from '@angular/core/testing';

import { UploadService } from './upload.service';
import {Observable} from "rxjs";

describe('UploadService', () => {
  let service: UploadService;

  it('should upload', () => {
    const expectedJson = JSON.stringify({msg: "done"});
    const expectedObservable = new Observable((observer) => observer.next(expectedJson))
    let mockService = {upload: (blobs: Blob[], id: string, key: string) => {
        return expectedObservable
    }};
    let service = mockService as UploadService;

    service.upload([], "", "").subscribe(json => {
      expect(json).toEqual(expectedJson);
    });

  });
});
