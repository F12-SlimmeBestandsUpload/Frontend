import { Component, Input, OnInit } from '@angular/core';
import { imageAndIndex } from '../shared/model/imageAndIndex.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  @Input() images!: string[]
  public selected!: imageAndIndex;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectHandler(imageAndIndex: imageAndIndex) {
    this.selected = imageAndIndex;
  }

}
