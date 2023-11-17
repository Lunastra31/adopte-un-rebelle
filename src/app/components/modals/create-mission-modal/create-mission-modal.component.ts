import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MissionService } from 'src/app/services/mission.service';
import { MissionType } from 'src/app/models/enums/mission-type';
import { MissionStatus } from 'src/app/models/enums/mission-status';
import { Mission } from '../../../models/mission';

@Component({
  selector: 'app-create-mission-modal',
  templateUrl: './create-mission-modal.component.html',
  styleUrls: ['./create-mission-modal.component.scss'],
})
export class CreateMissionModalComponent implements OnInit {
  public form!: FormGroup;
  protected missionTypes: any[] = Object.values(MissionType).filter(
    (value) => typeof value !== 'number'
  );
  public newMission!: Mission;
  public message!: string;

  constructor(
    private snackBar: MatSnackBar,
    private missionService: MissionService,
    public dialogRef: MatDialogRef<CreateMissionModalComponent>, // les 2 lignes permettent de récupérer les valeurs de l'autre composants
    @Inject(MAT_DIALOG_DATA) public data: CreateMissionModalModel // data = Les informations que j'ai passé de mon autre composants vers la modal
  ) {
    this.message = data.message;
  }

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      name: new FormControl('', Validators.required),
      missionType: new FormControl('', Validators.required),
    });
    console.log(this.missionTypes);
  }

  createMission(): void {
    this.newMission = {
      id: null,
      name: this.form.get('name')?.value,
      missionType: this.form.get('missionType')?.value,
      pilots: null,
      flightHours: 0,
      missionStatus: MissionStatus.EN_COURS,
    };
    console.log(this);

    this.missionService.createMission(this.newMission).subscribe({
      next: (mission) => {
        this.snackBar.open(mission.name + 'a bien été créée', '', {
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
  }
}
export class CreateMissionModalModel {
  constructor(public message: string) {}
}
