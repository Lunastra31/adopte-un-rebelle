import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PilotService } from '../../../services/pilot.service';
import { PilotBreed } from '../../../models/enums/pilot-breed';
import { Pilot } from '../../../models/pilot';
import { PilotStatus } from '../../../models/enums/pilot-status';
import { PilotRank } from '../../../models/enums/pilot-rank';
import { min } from 'rxjs';

@Component({
  selector: 'app-create-pilot-modal',
  templateUrl: './create-pilot-modal.component.html',
  styleUrls: ['./create-pilot-modal.component.scss'],
})
export class CreatePilotModalComponent implements OnInit {
  public form!: FormGroup;
  protected pilotBreeds: any[] = Object.values(PilotBreed).filter(
    (breed) => typeof breed !== 'number'
  );
  public newPilot!: Pilot;
  public message!: string;
  public errorMessages = {
    age: 'L\'âge doit être compris entre 10 et 800 ans.',
  };
  public hasError!: string;

  constructor(
    private snackBar: MatSnackBar,
    private pilotService: PilotService,
    public dialogRef: MatDialogRef<CreatePilotModalComponent>, // les 2 lignes permettent de récupérer les valeurs de l'autre composants
    @Inject(MAT_DIALOG_DATA) public data: CreatePilotModalModel // data = Les informations que j'ai passé de mon autre composants vers la modal
  ) {
    this.message = data.message;
  }

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      name: new FormControl(''),
      surname: new FormControl(''),
      pilotBreed: new FormControl(''),
      age: new FormControl(
        '',
        Validators.compose([Validators.min(10), Validators.max(800)])
      ),
    });
  }

  addPilot(): void {
    this.newPilot = {
      id: null,
      name: this.form.get('name')?.value,
      surname: this.form.get('surname')?.value,
      trainee: true,
      pilotBreed: this.form.get('pilotBreed')?.value,
      age: this.form.get('age')?.value,
      flightHours: 0,
      endedMissionCount: 0,
      pilotStatus: PilotStatus.DISPONIBLE,
      pilotRank: PilotRank.APPRENTI,
      hasStarship: false,
      mission: null,
    };
    console.log(this.newPilot);
    if (this.newPilot.age > 10 && this.newPilot.age < 800) {
      this.pilotService.addPilot(this.newPilot).subscribe({
        next: (pilot) => {
          this.snackBar.open(pilot.name + " a bien rejoint l'Alliance", '', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error(err.error.detail);
        },
      });
    } else {
      // Gère le cas où l'âge n'est pas dans la plage valide
      console.error("L'âge du pilote n'est pas dans la plage valide.");
    }
  }
}
export class CreatePilotModalModel {
  constructor(public message: string) {}
}
