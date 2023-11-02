import {Component, OnInit, ViewChild} from '@angular/core';
import {Pilot} from "../../models/pilot";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {PilotService} from "../../services/pilot.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatRadioChange} from "@angular/material/radio";
import {MatTableDataSource} from "@angular/material/table";
import {Starship} from "../../models/starship";

@Component({
  selector: 'app-pilot-page',
  templateUrl: './pilot-page.component.html',
  styleUrls: ['./pilot-page.component.scss']
})
export class PilotPageComponent implements OnInit {
  pilots! : Pilot[];
  flightHours! : number;
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
        this.dataSource = new MatTableDataSource<Pilot>(this.pilots);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        console.log(this.pilots);
      }
    })
  }

  redirectToAddPilot() {

  }

  applyFilter($event: KeyboardEvent) {

  }

  handleFilterChange($event: MatRadioChange) {

  }
}
