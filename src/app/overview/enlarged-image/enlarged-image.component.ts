import { Component, Input, OnInit } from '@angular/core';
import { ImageAndIndex } from 'src/app/shared/model/ImageAndIndex.model';

@Component({
  selector: 'app-enlarged-image',
  templateUrl: './enlarged-image.component.html',
  styleUrls: ['./enlarged-image.component.css']
})
export class EnlargedImageComponent implements OnInit {
  
  @Input() imageAndIndex!: ImageAndIndex;
  
  constructor() {

   }

  ngOnInit(): void {
  }
  imageSource(){
    var image = new Image(100,200)
    image.src = URL.createObjectURL(this.imageAndIndex.imageBlob)
    return image.src
  }
}    
