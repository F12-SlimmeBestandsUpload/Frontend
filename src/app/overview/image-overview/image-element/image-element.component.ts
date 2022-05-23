import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { imageAndIndex } from 'src/app/shared/model/imageAndIndex.model';


@Component({
  selector: 'app-image-element',
  templateUrl: './image-element.component.html',
  styleUrls: ['./image-element.component.css']
})
export class ImageElementComponent implements OnInit {
  @Input() image!: string;
  @Input() index!: number;
  @Output() SendSelectedImage = new EventEmitter<imageAndIndex>();

  public imageAndIndex!: imageAndIndex;

  constructor() { }


  ngOnInit(): void {
    this.imageAndIndex = {
      image : this.image,
      index : this.index
    }
  }

  selectImage(){
    this.SendSelectedImage.emit(this.imageAndIndex);
  }

}
