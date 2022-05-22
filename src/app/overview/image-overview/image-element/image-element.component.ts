import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-image-element',
  templateUrl: './image-element.component.html',
  styleUrls: ['./image-element.component.css']
})
export class ImageElementComponent implements OnInit {
  @Input() public image:number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  @Output()
  event = new EventEmitter<number>();

  deleteImage() {
    this.event.emit(this.image);
  }

}
