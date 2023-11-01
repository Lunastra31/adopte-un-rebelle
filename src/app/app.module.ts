import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreatePilotComponent } from './components/modals/create-pilot-modal/create-pilot.component';
import { CreateMissionModalComponent } from './components/modals/create-mission-modal/create-mission-modal.component';
import { CreatePilotModalComponent } from './components/modals/create-pilot-modal/create-pilot-modal.component';
import { CreateStarshipModalComponent } from './components/modals/create-starship-modal/create-starship-modal.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PilotPageComponent } from './pages/pilot-page/pilot-page.component';
import { MissionPageComponent } from './pages/mission-page/mission-page.component';
import { StarshipPageComponent } from './pages/starship-page/starship-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreatePilotComponent,
    CreateMissionModalComponent,
    CreatePilotModalComponent,
    CreateStarshipModalComponent,
    ConfirmModalComponent,
    HomePageComponent,
    PilotPageComponent,
    MissionPageComponent,
    StarshipPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
