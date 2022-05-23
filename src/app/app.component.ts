import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public images!: string[];
  constructor(){
    this.images = ['src/assets/testImage1.jpg','src/assets/testImage1.jpg','src/assets/testImage1.jpg','src/assets/testImage1.jpg','src/assets/testImage1.jpg','src/assets/testImage1.jpg']
  }
  title = 'app';

  

}

