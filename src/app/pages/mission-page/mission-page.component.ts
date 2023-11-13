import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatRadioChange} from '@angular/material/radio';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {
  AddPilotsToMissionModalComponent,
  AddPilotsToMissionModalModel
} from 'src/app/components/modals/add-pilots-to-mission-modal/add-pilots-to-mission-modal.component';
import {
  CreateMissionModalComponent,
  CreateMissionModalModel
} from 'src/app/components/modals/create-mission-modal/create-mission-modal.component';
import {Mission} from 'src/app/models/mission';
import {MissionService} from 'src/app/services/mission.service';
import {Pilot} from "../../models/pilot";
import {PilotService} from "../../services/pilot.service";

@Component({
  selector: 'app-mission-page',
  templateUrl: './mission-page.component.html',
  styleUrls: ['./mission-page.component.scss']
})
export class MissionPageComponent implements OnInit {

  missions!: Mission[]; // le point d'exclamation permet de dire je n'ai pas encore la valeur pilote mais c'est le résultat que j'attends pour cette variable
  selectedFilter: string = 'all';
  pilotsAvailableWithStarship! : Pilot[]

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
    private pilotService : PilotService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getAllMissions();
    this.getPilotsAvailableWithStarship();
  }

  getAllMissions(): void {
    this.missionService.getAllMissions().subscribe({
      next: (missions) => {
        this.missions = missions;
        //this.filterMission()
        this.dataSource = new MatTableDataSource<Mission>(this.missions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        console.log(this.missions);
      }
    })
  }

  getPilotsAvailableWithStarship(): void {
    this.pilotService.getAllPilots().subscribe({
      next: (pilots: Pilot[]) => {
        console.log(pilots);
        this.pilotsAvailableWithStarship = pilots.filter(pilot => {
          return pilot.pilotStatus.toString(0) === "DISPONIBLE" && pilot.hasStarship;
        });
      }
    });
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

  redirectToAddPilotsToMission(mission : Mission) {
    this.getPilotsAvailableWithStarship()
    console.log(this.pilotsAvailableWithStarship)
    const dialogData = new AddPilotsToMissionModalModel('Ajouter des pilotes à la mission', mission, this.pilotsAvailableWithStarship);
    this.dialog.open(AddPilotsToMissionModalComponent, {
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
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    //
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
    // this.filterMission(); // Appliquer le filtrage
  }

  handleFilterChange(event: MatRadioChange) {
    // this.selectedFilter = event.value;
    // console.log(this.selectedFilter);
    //
    // this.getAllMissions(); // Appliquer le filtrage des matériaux
  }

  filterMission() {
    // if (this.selectedFilter === 'all') {
    //   // Pas de filtrage, afficher tous
    //   return;
    // }
    // if (this.selectedFilter === 'EN_COURS') {
    //   this.missions = this.missions.filter(
    //     (mission) => mission
    //   );
    // }
    // if (this.selectedFilter === 'ECHEC') {
    //   this.missions = this.missions.filter(
    //     (mission) => mission
    //   );
    // }
    // if (this.selectedFilter === 'REUSSITE') {
    //   this.missions = this.missions.filter(
    //     (mission) => mission
    //   );
    // }
  }

}
