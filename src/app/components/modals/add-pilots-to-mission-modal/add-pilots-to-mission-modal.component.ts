import { Component, Inject } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MissionService } from 'src/app/services/mission.service';
import { Pilot } from 'src/app/models/pilot';
import {Mission} from "../../../models/mission";

@Component({
  selector: 'app-add-pilots-to-mission-modal',
  templateUrl: './add-pilots-to-mission-modal.component.html',
  styleUrls: ['./add-pilots-to-mission-modal.component.scss']
})
export class AddPilotsToMissionModalComponent {
  public form!: FormGroup;
  public pilots: FormControl;
  public message!: string;
  public pilotsToAffect!: Pilot[];
  public missionToStrengthen : Mission;
  public pilotsAvailableWithAStarship : Pilot[];
  // public pilots!: FormControl;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private missionService : MissionService,
    public dialogRef: MatDialogRef<AddPilotsToMissionModalComponent>, // les 2 lignes permettent de récupérer les valeurs de l'autre composants
    @Inject(MAT_DIALOG_DATA) public data: AddPilotsToMissionModalModel // data = Les informations que j'ai passé de mon autre composants vers la modal
  ) {
    this.message = data.message;
    this.missionToStrengthen = data.missionToStrengthen;
    this.pilotsAvailableWithAStarship = data.pilotsAvailableWithAStarship;
    this.pilots = this.fb.control([]);
    this.form = this.fb.group({
      pilots: this.pilots,
    });
  }

  ngOnInit(): void {
  }


  handleAddPilotsToMission(): void {
    this.pilotsToAffect = this.form.get("pilots")?.value;
    console.log(this.pilotsToAffect)

    if (this.missionToStrengthen.id) {
      this.missionService.affectPilot(this.pilotsToAffect, this.missionToStrengthen.id).subscribe({
        next: (mission : Mission) => {
          this.snackBar.open(mission.name + "a bien été modifier", "", {
            duration: 2000,
            verticalPosition: "top",
            horizontalPosition: "center",
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          const errorDetail = err.error ? err.error.detail : 'Unknown error';
          console.error(errorDetail);
        }
      })
    }
  }

}
export class AddPilotsToMissionModalModel {
  constructor(public message: string, public missionToStrengthen : Mission, public pilotsAvailableWithAStarship : Pilot[] ) { }
}


