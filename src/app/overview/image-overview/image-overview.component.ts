import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { imageAndIndex } from 'src/app/shared/model/imageAndIndex.model';

@Component({
  selector: 'app-image-overview',
  templateUrl: './image-overview.component.html',
  styleUrls: ['./image-overview.component.css']
})
export class ImageOverviewComponent implements OnInit {

  @Input() images!: string[];
  @Output() onSelect = new EventEmitter<imageAndIndex>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectHandler(imageAndIndex : imageAndIndex) {
    this.onSelect.emit(imageAndIndex);
  }
}
