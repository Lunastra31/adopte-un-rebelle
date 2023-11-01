import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateMissionModalComponent } from './components/modals/create-mission-modal/create-mission-modal.component';
import { CreatePilotModalComponent } from './components/modals/create-pilot-modal/create-pilot-modal.component';
import { CreateStarshipModalComponent } from './components/modals/create-starship-modal/create-starship-modal.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PilotPageComponent } from './pages/pilot-page/pilot-page.component';
import { MissionPageComponent } from './pages/mission-page/mission-page.component';
import { StarshipPageComponent } from './pages/starship-page/starship-page.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
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
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatSortModule,
    MatPaginatorModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
