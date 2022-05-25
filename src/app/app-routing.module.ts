import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from "./camera/camera.component";
import { OverviewComponent} from "./overview/overview.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/camera'
  },
  {
    path: 'camera',
    component: CameraComponent,
  },
  {
    path: 'overview',
    component: OverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
