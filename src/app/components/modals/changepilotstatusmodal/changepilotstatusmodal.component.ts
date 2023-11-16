import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pilot } from 'src/app/models/pilot';
import { PilotService } from 'src/app/services/pilot.service';
import { PilotStatus } from 'src/app/models/enums/pilot-status';

@Component({
  selector: 'app-changepilotstatusmodal',
  templateUrl: './changepilotstatusmodal.component.html',
  styleUrls: ['./changepilotstatusmodal.component.scss'],
})
export class ChangepilotstatusmodalComponent implements OnInit {
  // LES ATTRIBUTS DE L'OBJET //
  public form!: FormGroup;
  public pilotChangedStatus!: Pilot;
  public message!: string;
  public newStatus!: PilotStatus;
  protected pilotStatus: any[] = Object.values(PilotStatus).filter(
    (status) => typeof status !== 'number'
  );

  // CONSTRUCTEUR //

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private pilotService: PilotService,
    public dialogRef: MatDialogRef<ChangepilotstatusmodalComponent>, // les 2 lignes permettent de récupérer les valeurs de l'autre composants
    @Inject(MAT_DIALOG_DATA) public data: ChangepilotstatusmodalModel // data = Les informations que j'ai passé de mon autre composants vers la modal
  ) {
    this.message = data.message;
    this.pilotChangedStatus = data.pilotChangedStatus;
  }

  // LES METHODES / FONCTIONS //

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      pilotStatus: new FormControl(''),
    });
  }

  changePilotStatus(): void {
    this.newStatus = this.form.get('pilotStatus')?.value;

    if (this.pilotChangedStatus.id) {
      this.pilotService
        .changePilotStatus(this.newStatus, this.pilotChangedStatus.id)
        .subscribe({
          next: (res) => {
            this.snackBar.open(res.name + 'a bien été modifié', '', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
            this.dialogRef.close(true);
          },
          error: (err) => {
            const errorDetail = err.error ? err.error.detail : 'Unknown error';
            console.error(errorDetail);
          },
        });
    }
  }
}
export class ChangepilotstatusmodalModel {
  constructor(public message: string, public pilotChangedStatus: Pilot) {}
}
