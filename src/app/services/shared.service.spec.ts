import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationExtras, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

describe('SharedService', () => {
  let sharedService: SharedService;

  beforeEach(() => {
    let mockRouter = {
      navigate: async (commands: any[], extras?: NavigationExtras) => {
        return true;
      }
    }
    let router = mockRouter as Router;
    sharedService = new SharedService(router);
  })

  it("Should delete blob from SharedService", () =>{
    let blob = new Blob([])
    sharedService.addBlob(blob)
    sharedService.addBlob(blob)
    var length = sharedService.blobs.length
    sharedService.deleteBlob(blob)
    expect(sharedService.blobs.length).toEqual(length - 1)

  })
});
