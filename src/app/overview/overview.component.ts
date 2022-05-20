import { Component, Input, OnInit } from '@angular/core';
import { ImageAndIndex } from '../shared/model/ImageAndIndex.model'
import { SharedService } from '../shared/shared.service';
import {idService} from "../services/id.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  @Input() imageBlobs!: Blob[]
  public selected: ImageAndIndex | undefined;

  constructor(sharedService: SharedService,private idService: idService) {
    this.imageBlobs = sharedService.getBlobs()
  }

  ngOnInit(): void {
    this.idService.getId().then((string) => {
      console.log(string);
    })
  }

  onSelectHandler(imageAndIndex: ImageAndIndex) {
    this.selected = imageAndIndex;
  }
  removeSelectHandler(blob: Blob){
    this.selected = undefined;
  }

}
