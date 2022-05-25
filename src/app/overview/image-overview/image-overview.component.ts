import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageAndIndex } from 'src/app/shared/model/ImageAndIndex.model';

@Component({
  selector: 'app-image-overview',
  templateUrl: './image-overview.component.html',
  styleUrls: ['./image-overview.component.css']
})
export class ImageOverviewComponent implements OnInit {

  @Input() imageBlobs!: Blob[];
  @Output() onSelect = new EventEmitter<ImageAndIndex>();

  constructor() { 
  }

  ngOnInit(): void {
  }

  onSelectHandler(imageAndIndex : ImageAndIndex) {
    this.onSelect.emit(imageAndIndex);
  }
}
