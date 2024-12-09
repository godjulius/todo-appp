import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainRoutingModule} from "./main-routing.module";
import {UserComponent} from "./user/user.component";

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    // RouterModule.forChild([
    //   {path: '', component: MainPageComponent}
    // ]),
    MainRoutingModule,
    UserComponent
  ]
})
export class MainModule { }
