import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mission } from 'src/app/models/mission';
import { MissionService } from 'src/app/services/mission.service';
import { MissionStatus } from 'src/app/models/enums/mission-status';

@Component({
  selector: 'app-end-mission-modal',
  templateUrl: './end-mission-modal.component.html',
  styleUrls: ['./end-mission-modal.component.scss']
})
export class EndMissionModalComponent implements OnInit {
  public form!: FormGroup;
  protected missionStatus: any[] = Object.values(MissionStatus).filter(
    (status) => typeof status !== 'number'
  );
  protected filterMissionStatus: any[] = 
  this.missionStatus.filter((status) => status != 'EN_COURS');

  public mission!: Mission;
  public message!: string;

  constructor(
    private snackBar: MatSnackBar,
    private missionService: MissionService,
    public dialogRef: MatDialogRef<EndMissionModalComponent>, // les 2 lignes permettent de récupérer les valeurs de l'autre composants
    @Inject(MAT_DIALOG_DATA) public data: EndMissionModalModel // data = Les informations que j'ai passé de mon autre composants vers la modal
  ) {
    this.message = data.message;
  }

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      flightHours: new FormControl(''),
      missionStatus: new FormControl(''),
    });
  }



  endMission(): void {
    this.mission = {
      id: this.mission.id,
      name: this.mission.name,
      missionType: this.mission.missionType,
      pilots: this.mission.pilots,
      flightHours: this.form.get("flightHours")?.value,
      missionStatus: this.form.get("missionStatus")?.value
    }
    console.log(this)

    this.missionService.endMission(this.mission).subscribe({
      next: (mission) => {
        this.snackBar.open(mission.name + "est bien terminée", "", {
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
export class EndMissionModalModel {
  constructor(public message: string, public mission: Mission) { }
}

