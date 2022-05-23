import { Component, Input, OnInit } from '@angular/core';
import { imageAndIndex } from 'src/app/shared/model/imageAndIndex.model';

@Component({
  selector: 'app-enlarged-image',
  templateUrl: './enlarged-image.component.html',
  styleUrls: ['./enlarged-image.component.css']
})
export class EnlargedImageComponent implements OnInit {

  @Input() imageAndIndex!: imageAndIndex;

  constructor() { }

  ngOnInit(): void {
  }

}
