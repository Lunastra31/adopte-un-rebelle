import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StarshipService} from "../../../services/starship.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Starship} from "../../../models/starship";
import {Pilot} from "../../../models/pilot";

@Component({
  selector: 'app-affect-pilot-to-starship-modal',
  templateUrl: './affect-pilot-to-starship-modal.component.html',
  styleUrls: ['./affect-pilot-to-starship-modal.component.scss']
})
export class AffectPilotToStarshipModalComponent {

  public form!: FormGroup;
  //public newStarship!: any;
  public pilotToAffect!: Pilot;
  public message!: string;
  public starshipToAffect!: Starship;
  public pilotsAvailableWithoutAStarship!: Pilot[];

  constructor(
    private snackBar: MatSnackBar,
    private starshipServcie: StarshipService,
    public dialogRef: MatDialogRef<AffectPilotToStarshipModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AffectPilotToStarshipModalModel
  ) {
    this.message = data.message;
    this.starshipToAffect = data.starshipToAffect;
    this.pilotsAvailableWithoutAStarship = data.pilotsAvailableWithoutStarship;
  }

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      pilot: new FormControl(''),
    });
    console.log(this.pilotsAvailableWithoutAStarship)
  }

  handleAffectAPilotToStarship() : void {
    // this.newStarship = {
    //   id: this.starshipToAffect.id,
    //   name: this.starshipToAffect.name,
    //   starshipType: this.starshipToAffect.starshipType,
    //   starshipStatus: this.starshipToAffect.starshipStatus,
    //   pilot: this.form.get("pilot")?.value,
    // }
    // console.log(this)

    this.pilotToAffect = this.form.get("pilot")?.value;

    if (this.starshipToAffect.id) {
      this.starshipServcie.affectPilot(this.pilotToAffect, this.starshipToAffect.id).subscribe({
        next: (res) => {
          this.snackBar.open(res.name + "a bien été modifier", "", {
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

export class AffectPilotToStarshipModalModel {
  constructor(public message: string, public starshipToAffect : Starship, public pilotsAvailableWithoutStarship : Pilot[]) {}
}
