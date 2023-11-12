import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddPilotsToMissionModalModel } from 'src/app/components/modals/add-pilots-to-mission-modal/add-pilots-to-mission-modal.component';
import {
  CreateMissionModalComponent,
  CreateMissionModalModel
} from 'src/app/components/modals/create-mission-modal/create-mission-modal.component';
import { Mission } from 'src/app/models/mission';
import { MissionService } from 'src/app/services/mission.service';

@Component({
  selector: 'app-mission-page',
  templateUrl: './mission-page.component.html',
  styleUrls: ['./mission-page.component.scss']
})
export class MissionPageComponent implements OnInit {

  mission!: Mission[]; // le point d'exclamation permet de dire je n'ai pas encore la valeur pilote mais c'est le résultat que j'attends pour cette variable
  selectedFilter: string = 'all';

  displayedColumns: string[] = [
    'name',
    'missionType',
    'pilots',
    'flightHours',
    'missionStatus',
    'addPilotsToMission',
    'endMission'
  ];

  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(
    private missionService: MissionService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllMissions()
  }
  getAllMissions(): void {
    this.missionService.getAllMissions().subscribe({
      next: (missions) => {
        this.mission = missions;
        this.filterMission()
        this.dataSource = new MatTableDataSource<Mission>(this.mission);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        console.log(this.mission);
      }
    })
  }

  redirectToCreateMission() {
    const dialogData = new CreateMissionModalModel('Créer une nouvelle mission');
    this.dialog
      .open(CreateMissionModalComponent, {
        maxWidth: '1000px',
        data: dialogData,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === true) {
          this.getAllMissions();
        }
      });
  }

  redirectToAddPilotsToMission(){
    const dialogData = new AddPilotsToMissionModalModel('Ajouter des pilotes');
    this.dialog
    .open(CreateMissionModalComponent, {
      maxWidth: '1000px',
      data: dialogData,
    })
    .afterClosed()
    .subscribe((res) => {
      if (res === true) {
        this.getAllMissions();
      }
    });
  }

  redirectToEndMission() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.filterMission(); // Appliquer le filtrage
  }

  handleFilterChange(event: MatRadioChange) {
    this.selectedFilter = event.value;
    console.log(this.selectedFilter);

    this.getAllMissions(); // Appliquer le filtrage des matériaux
  }

  filterMission() {
    if (this.selectedFilter === 'all') {
      // Pas de filtrage, afficher tous
      return;
    }
    if (this.selectedFilter === 'EN_COURS') {
      this.mission = this.mission.filter(
        (mission) => mission
      );
    }
    if (this.selectedFilter === 'ECHEC') {
      this.mission = this.mission.filter(
        (mission) => mission
      );
    }
    if (this.selectedFilter === 'REUSSITE') {
      this.mission = this.mission.filter(
        (mission) => mission
      );
    }
    //   else {
    //     Filtrer en fonction de la valeur sélectionnée

    //     this.mission = this.mission.filter(
    //       (mission) => mission.missionStatus === this.selectedFilter
    //     );
    //   }
  }

}
