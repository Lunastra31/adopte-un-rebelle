import {Component, OnInit, ViewChild} from '@angular/core';
import {Starship} from "../../models/starship";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StarshipService} from "../../services/starship.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {
  CreateStarshipModalComponent,
  CreateStarshipModalModel
} from "../../components/modals/create-starship-modal/create-starship-modal.component";

@Component({
  selector: 'app-starship-page',
  templateUrl: './starship-page.component.html',
  styleUrls: ['./starship-page.component.scss']
})
export class StarshipPageComponent implements OnInit {

  starships! : Starship[];

  displayedColumns: string[] = [
    'name',
    'starshipType',
    'starshipStatus',
    'changeStatus',
    'pilot',
    'affectPilot',
    'disusedPilot'
  ];

  dataSource!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(
    private starshipService: StarshipService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllStarships()
  }

  getAllStarships() : void {
    this.starshipService.getAllStarship().subscribe({
      next: (starships) => {
        this.starships = starships;
        this.dataSource = new MatTableDataSource<Starship>(this.starships);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        console.log(this.starships);
      }
    })
  }

  redirectToAddStarship() {
    const dialogData = new CreateStarshipModalModel("Création d'un nouveau vaisseau");
    this.dialog
      .open(CreateStarshipModalComponent, {
        maxWidth: '1000px',
        data: dialogData,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === true) {
          this.getAllStarships();
        }
      });
  }

  applyFilter($event: KeyboardEvent) {

  }

  changeStarshipStatut() {

  }

  redirectToAffectPilot() {

  }

  disuedPilot() {

  }
}
