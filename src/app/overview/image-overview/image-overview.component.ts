import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-overview',
  templateUrl: './image-overview.component.html',
  styleUrls: ['./image-overview.component.css']
})
export class ImageOverviewComponent implements OnInit {
  public images:number[] = [1,2,3,4,5];

  constructor() { }

  ngOnInit(): void {
  }

  removeImage(image: number){
    this.images = this.images.filter(item => item !== image);
  }

}
