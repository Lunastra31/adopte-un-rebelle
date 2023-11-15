import {Component, OnInit, ViewChild} from '@angular/core';
import {Pilot} from "../../models/pilot";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {PilotService} from "../../services/pilot.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatRadioChange} from "@angular/material/radio";
import {MatTableDataSource} from "@angular/material/table";
import {
  CreatePilotModalComponent,
  CreatePilotModalModel
} from "../../components/modals/create-pilot-modal/create-pilot-modal.component";

@Component({
  selector: 'app-pilot-page',
  templateUrl: './pilot-page.component.html',
  styleUrls: ['./pilot-page.component.scss']
})
export class PilotPageComponent implements OnInit {
  pilots! : Pilot[]; // le point d'exclamation permet de dire je n'ai pas encore la valeur pilote mais c'est le résultat que j'attends pour cette variable
  flightHours : number = 0;
  selectedFilter: string = 'all';

  displayedColumns: string[] = [
    'name',
    'surname',
    'pilotBreed',
    'pilotStatus',
    'pilotRank',
    'flightHours',
    'missions'
  ];

  dataSource!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(
    private pilotService: PilotService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllPilots()
  }

  getAllPilots() : void {
    this.pilotService.getAllPilots().subscribe({
      next: (pilots) => {
        this.pilots = pilots;
        this.filterPilots()
        this.dataSource = new MatTableDataSource<Pilot>(this.pilots);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        console.log(this.pilots);
      }
    })
  }

  redirectToAddPilot() {
    const dialogData = new CreatePilotModalModel('Ajouter un nouveau pilote');
    this.dialog
      .open(CreatePilotModalComponent, {
        maxWidth: '1000px',
        data: dialogData,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === true) {
          this.getAllPilots();
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.filterPilots(); // Appliquer le filtrage
  }

  handleFilterChange(event: MatRadioChange) {
    this.selectedFilter = event.value;
    console.log(this.selectedFilter);

    this.getAllPilots(); // Appliquer le filtrage des matériaux
  }

  filterPilots() {
    if (this.selectedFilter === 'all') {
      // Pas de filtrage, afficher tous
      return;
    }
    if (this.selectedFilter === 'APPRENTI') {
      this.pilots = this.pilots.filter(
        (pilot) => pilot.isTrainee === true
       );
     }
    else {
      //Filtrer en fonction de la valeur sélectionnée

      this.pilots = this.pilots.filter(
        // @ts-ignore
        (pilot) => pilot.pilotStatus === this.selectedFilter
      );
    }
  }
}
