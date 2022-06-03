import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {idService } from './id.service';
import {Router} from "@angular/router"
import {RouterModule} from "@angular/router";

describe('IdService', () => {
  let service: idService;
  let id:Number = 123123;
  let router:Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ]
    });
    service = TestBed.inject(idService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("test for id",
    fakeAsync( () => {
      let idFromRoute:String ="";

      router.navigateByUrl('/?id='+id);

      service.getId().then((string) => {
        idFromRoute = string;
      });
      tick(200);

      expect(idFromRoute).toEqual(id.toString());
    }
    )

  )

})
