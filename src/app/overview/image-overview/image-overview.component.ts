import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ImageAndIndex } from 'src/app/shared/model/ImageAndIndex.model';

@Component({
  selector: 'app-image-overview',
  templateUrl: './image-overview.component.html',
  styleUrls: ['./image-overview.component.css']
})
export class ImageOverviewComponent implements OnInit {

  @Input() imageBlobs!: Blob[];
  @Output() onSelect = new EventEmitter<ImageAndIndex>();
  private router: Router;

  constructor(router: Router) { 
    this.router = router;
  }

  ngOnInit(): void {
  }

  onSelectHandler(imageAndIndex : ImageAndIndex) {
    this.onSelect.emit(imageAndIndex);
  }

  addPhoto(){
    this.router.navigate(["camera"])
  }
}
