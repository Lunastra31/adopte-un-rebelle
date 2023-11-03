import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MissionType } from 'src/app/models/enums/mission-type';
import { MissionService } from 'src/app/services/mission.service';
import { CreateMissionModalComponent, CreateMissionModalModel } from '../create-mission-modal/create-mission-modal.component';
import { PilotService } from 'src/app/services/pilot.service';
import { PilotStatus } from 'src/app/models/enums/pilot-status';

@Component({
  selector: 'app-add-pilots-to-mission-modal',
  templateUrl: './add-pilots-to-mission-modal.component.html',
  styleUrls: ['./add-pilots-to-mission-modal.component.scss']
})
export class AddPilotsToMissionModalComponent {
  public form!: FormGroup;
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
      pilotListControl = new FormControl('', [Validators.required, this.validatePilot.bind(this)], getAllPilots().filter(PilotStatus=='DISPONIBLE'));
      pilotList: string = '';
      availablePilots: string[] = []
    });
  }
  // Liste de pilotes existants (pour la validation)
  availablePilots: string[]; /* Ajoutez les pilotes existants ici */

  saveMission(): void {
    if (this.pilotListControl.valid) {
      // Traitement pour enregistrer la mission avec la liste de pilotes
      // Vous pouvez accéder à la liste de pilotes via this.pilotList
      this.dialogRef.close();
    }
  }

  validatePilot(control: FormControl): { [key: string]: boolean } | null {
    const pilotName = control.value;
    if (this.availablePilots.indexOf(pilotName) === -1) {
      return { 'invalidPilot': true };
    }
    return null;
  }
export class AddPilotsToMissionModalModel {
  constructor(public message: string) { }
}

}