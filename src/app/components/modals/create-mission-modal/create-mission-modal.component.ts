import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MissionService } from 'src/app/services/mission.service';
import { MissionType } from 'src/app/models/enums/mission-type';

@Component({
  selector: 'app-create-mission-modal',
  templateUrl: './create-mission-modal.component.html',
  styleUrls: ['./create-mission-modal.component.scss']
})
export class CreateMissionModalComponent implements OnInit {

  public form!: FormGroup;
  protected missionType: any[] = Object.values(MissionType).filter(
    (type) => typeof type !== 'number'
  );
  public selectedPilotCount: any;
  public newMission!: any;
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
      name: new FormControl(''),
      surname: new FormControl(''),
      pilotBreed: new FormControl('')
    });
  }

  createMission() : void {
    this.newMission = {
      name: this.form.get("name")?.value,
      missionType: this.form.get("missionType")?.value,
      selectedPilotCount: this.form.get("pilotCount")?.value,
      selectedPilot: this.form.get("pilots")?.value
    }
    console.log(this)

    this.missionService.createMission(this.newMission).subscribe({
      next: (mission) => {
        this.snackBar.open(mission.name + "a bien été créée", "", {
          duration: 2000,
          verticalPosition: "top",
          horizontalPosition: "center",
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err.error.detail);
      }
    })
  }
}
export class CreateMissionModalModel {
  constructor(public message: string) {}
}
