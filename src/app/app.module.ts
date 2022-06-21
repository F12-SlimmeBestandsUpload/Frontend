import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { CameraComponent } from './camera/camera.component';
import { FormsModule } from '@angular/forms';
import { OverviewComponent } from './overview/overview.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ImageOverviewComponent } from './overview/image-overview/image-overview.component';
import { ImageElementComponent } from './overview/image-overview/image-element/image-element.component';
import { EnlargedImageComponent } from './overview/enlarged-image/enlarged-image.component';
import { WebcamModule } from "ngx-webcam";
import { EndScreenComponent } from './overview/end-screen/end-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    OverviewComponent,
    TopBarComponent,
    ImageOverviewComponent,
    ImageElementComponent,
    EnlargedImageComponent,
    EndScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WebcamModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
