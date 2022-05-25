import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import {WebcamModule} from "ngx-webcam";
import { FormsModule } from '@angular/forms';
import { OverviewComponent } from './overview/overview.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ImageOverviewComponent } from './overview/image-overview/image-overview.component';
import { ImageElementComponent } from './overview/image-overview/image-element/image-element.component';
import { EnlargedImageComponent } from './overview/enlarged-image/enlarged-image.component';


@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    OverviewComponent,
    TopBarComponent,
    ImageOverviewComponent,
    ImageElementComponent,
    EnlargedImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
