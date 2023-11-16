import { Component, OnInit, ViewChild } from '@angular/core';
import { Starship } from '../../models/starship';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StarshipService } from '../../services/starship.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {
  CreateStarshipModalComponent,
  CreateStarshipModalModel,
} from '../../components/modals/create-starship-modal/create-starship-modal.component';
import {
  AffectPilotToStarshipModalComponent,
  AffectPilotToStarshipModalModel,
} from '../../components/modals/affect-pilot-to-starship-modal/affect-pilot-to-starship-modal.component';
import { Pilot } from '../../models/pilot';
import { PilotService } from '../../services/pilot.service';
import { PilotStatus } from '../../models/enums/pilot-status';
import {
  ChangestarshipstatusmodalComponent,
  ChangestarshipstatusmodalModel,
} from 'src/app/components/modals/changestarshipstatusmodal/changestarshipstatusmodal.component';

@Component({
  selector: 'app-starship-page',
  templateUrl: './starship-page.component.html',
  styleUrls: ['./starship-page.component.scss'],
})
export class StarshipPageComponent implements OnInit {
  starships!: Starship[];
  PilotsAvailableWithoutStarship!: Pilot[];

  displayedColumns: string[] = [
    'name',
    'starshipType',
    'starshipStatus',
    'changeStatus',
    'pilot',
    'affectPilot',
    'disusedPilot',
  ];

  dataSource!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(
    private starshipService: StarshipService,
    private pilotService: PilotService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllStarships();
    this.getPilotsWithoutStarship();
  }

  getPilotsWithoutStarship(): void {
    this.pilotService.getAllPilots().subscribe({
      next: (pilots: Pilot[]) => {
        console.log(pilots);
        this.PilotsAvailableWithoutStarship = pilots.filter((pilot) => {
          return (
            pilot.pilotStatus.toString(0) === 'DISPONIBLE' && !pilot.hasStarship
          );
        });
        console.log(this.PilotsAvailableWithoutStarship);
      },
    });
  }

  getAllStarships(): void {
    this.starshipService.getAllStarship().subscribe({
      next: (starships) => {
        this.starships = starships;
        this.dataSource = new MatTableDataSource<Starship>(this.starships);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        console.log(this.starships);
      },
    });
  }

  redirectToAddStarship(): void {
    const dialogData = new CreateStarshipModalModel(
      "Création d'un nouveau vaisseau"
    );
    this.getPilotsWithoutStarship();
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectToChangeStarshipStatus(starshipChangedStatus: Starship) {
    const dialogData = new ChangestarshipstatusmodalModel(
      'Changer le status du vaisseau ',
      starshipChangedStatus
    );
    this.dialog
      .open(ChangestarshipstatusmodalComponent, {
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

  redirectToAffectPilot(starship: Starship): void {
    const dialogData = new AffectPilotToStarshipModalModel(
      'Affecter un pilote au vaisseau',
      starship,
      this.PilotsAvailableWithoutStarship
    );
    this.dialog
      .open(AffectPilotToStarshipModalComponent, {
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

  desaffectPilot(starship: Starship): void {
    if (starship.id != null) {
      this.starshipService.desaffectPilot(starship.id).subscribe({
        next: (starship: Starship) => {
          this.getAllStarships();
          this.snackBar.open(
            'Le pilote a bien été dessafecté de' + starship.name,
            '',
            {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            }
          );
        },
        error: (error: any) => {
          this.snackBar.open(
            "Une erreur s'est produite lors de la desafectation du pilote" +
              error,
            '',
            {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            }
          );
        },
      });
    }
  }
}
