import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { ImageAndIndex } from 'src/app/shared/model/ImageAndIndex.model';

@Component({
  selector: 'app-enlarged-image',
  templateUrl: './enlarged-image.component.html',
  styleUrls: ['./enlarged-image.component.css']
})
export class EnlargedImageComponent implements OnInit, AfterViewInit {

  @Input() imageAndIndex!: ImageAndIndex;
  @ViewChild("imag") imageTag!: ElementRef;

  constructor() {

  }

  ngAfterViewInit() {
    this.imageTag.nativeElement.src = URL.createObjectURL(this.imageAndIndex.imageBlob);
  }

  ngOnInit(): void {

  }
}
