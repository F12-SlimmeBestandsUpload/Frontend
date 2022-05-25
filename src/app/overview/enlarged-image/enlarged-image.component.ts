import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ImageAndIndex } from 'src/app/shared/model/ImageAndIndex.model';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-enlarged-image',
  templateUrl: './enlarged-image.component.html',
  styleUrls: ['./enlarged-image.component.css']
})
export class EnlargedImageComponent implements OnInit, AfterViewInit {

  @Input() imageAndIndex!: ImageAndIndex;
  @Output() removeSelected = new EventEmitter<Blob>();
  
  @ViewChild("imag") imageTag!: ElementRef;
  public sharedService: SharedService;
  public router: Router;

  constructor(sharedService: SharedService, router: Router) {
    this.sharedService = sharedService;
    this.router = router;
  }

  ngAfterViewInit() {
    this.imageTag.nativeElement.src = URL.createObjectURL(this.imageAndIndex.imageBlob);
  }

  ngOnInit(): void {

  }

  goBack(){
    this.removeSelected.emit(this.imageAndIndex.imageBlob)
  }

  delete(){
    this.sharedService.deleteBlob(this.imageAndIndex.imageBlob)
    this.removeSelected.emit(this.imageAndIndex.imageBlob)
  }
}
