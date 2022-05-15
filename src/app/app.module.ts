import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ImageOverviewComponent } from './overview/image-overview/image-overview.component';
import { ImageElementComponent } from './overview/image-overview/image-element/image-element.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    TopBarComponent,
    ImageOverviewComponent,
    ImageElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
