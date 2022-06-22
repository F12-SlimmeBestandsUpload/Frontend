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

  it("Should delete unwanted blob from SharedService", () =>{
    let blob1 = new Blob([])
    let blob2 = new Blob([])
    sharedService.addBlob(blob1)
    sharedService.addBlob(blob2)
    sharedService.deleteBlob(blob1)
    expect(sharedService.blobs.includes(blob1)).toEqual(false);
  })

  it("Should not delete wanted blob from SharedService", () =>{
    let blob1 = new Blob([])
    let blob2 = new Blob([])
    sharedService.addBlob(blob1)
    sharedService.addBlob(blob2)
    sharedService.deleteBlob(blob1)
    expect(sharedService.blobs.includes(blob2)).toEqual(true);
  })

  it("Should add blob to SharedService blobs variable", () =>{
    let blob1 = new Blob([])
    sharedService.addBlob(blob1)
    expect(sharedService.blobs.includes(blob1)).toEqual(true);
  })

  it("Should add 2 blobs to SharedService blobs variable", () =>{
    let blob1 = new Blob([])
    let blob2 = new Blob([])
    sharedService.addBlob(blob1)
    sharedService.addBlob(blob2)
    expect(sharedService.blobs.includes(blob1) && sharedService.blobs.includes(blob2)).toEqual(true);
  })
});
