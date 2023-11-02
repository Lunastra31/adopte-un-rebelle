import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {StarshipPageComponent} from "./pages/starship-page/starship-page.component";
import {PilotPageComponent} from "./pages/pilot-page/pilot-page.component";
import {MissionPageComponent} from "./pages/mission-page/mission-page.component";

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path: "starship", component: StarshipPageComponent},
  {path: "pilot", component: PilotPageComponent},
  {path: "mission", component: MissionPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
