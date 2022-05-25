import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ImageAndIndex } from 'src/app/shared/model/ImageAndIndex.model';


@Component({
  selector: 'app-image-element',
  templateUrl: './image-element.component.html',
  styleUrls: ['./image-element.component.css']
})
export class ImageElementComponent implements OnInit {
  @Input() imageBlob!: Blob;
  @Input() index!: number;
  @Output() SendSelectedImage = new EventEmitter<ImageAndIndex>();

  public imageAndIndex!: ImageAndIndex;

  constructor() { }


  ngOnInit(): void {
    this.imageAndIndex = {
      imageBlob : this.imageBlob,
      index : this.index + 1
    }

  }

  selectImage(){
    this.SendSelectedImage.emit(this.imageAndIndex);
  }

}