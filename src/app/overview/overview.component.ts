import { Component, OnInit } from '@angular/core';
import {idService} from "../services/id.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private idService: idService) { }

  ngOnInit(): void {
    this.idService.getId().then((string) => {
      console.log(string);
    })
  }

}
