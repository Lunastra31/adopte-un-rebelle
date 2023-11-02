import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PilotService} from "../../../services/pilot.service";
import {PilotBreed} from "../../../models/enums/pilot-breed";

@Component({
  selector: 'app-create-pilot-modal',
  templateUrl: './create-pilot-modal.component.html',
  styleUrls: ['./create-pilot-modal.component.scss']
})
export class CreatePilotModalComponent implements OnInit {

  public form!: FormGroup;
  protected pilotBreeds: any[] = Object.values(PilotBreed).filter(
    (breed) => typeof breed !== 'number'
  );
  public newPilot!: any;
  public message!: string;

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
      pilotBreed: new FormControl('')
    });
  }

  handleAddPilot() : void {
    this.newPilot = {
      name: this.form.get("name")?.value,
      surname: this.form.get("surname")?.value,
      pilotBreed : this.form.get("pilotBreed")?.value,
      pilotStatus: "DISPONIBLE",
      pilotRank: "APPRENTI"
    }
    console.log(this)

    this.pilotService.addPilot(this.newPilot).subscribe({
      next: (pilot) => {
        this.snackBar.open(pilot.name + "a bien été créer", "", {
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
export class CreatePilotModalModel {
  constructor(public message: string) {}
}
