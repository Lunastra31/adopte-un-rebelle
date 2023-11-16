import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StarshipStatus } from 'src/app/models/enums/starship-status';
import { Starship } from 'src/app/models/starship';
import { StarshipService } from 'src/app/services/starship.service';

@Component({
  selector: 'app-changestarshipstatusmodal',
  templateUrl: './changestarshipstatusmodal.component.html',
  styleUrls: ['./changestarshipstatusmodal.component.scss'],
})
export class ChangestarshipstatusmodalComponent {
  // LES ATTRIBUTS DE L'OBJET //
  public form!: FormGroup;
  public starshipChangedStatus!: Starship;
  public message!: string;
  public newStatus!: StarshipStatus;
  protected starshipStatus: any[] = Object.values(StarshipStatus).filter(
    (status) => typeof status !== 'number'
  );

  // CONSTRUCTEUR //

  constructor(
    private snackBar: MatSnackBar,
    private starshipService: StarshipService,
    public dialogRef: MatDialogRef<ChangestarshipstatusmodalComponent>, // les 2 lignes permettent de récupérer les valeurs de l'autre composants
    @Inject(MAT_DIALOG_DATA) public data: ChangestarshipstatusmodalModel // data = Les informations que j'ai passé de mon autre composants vers la modal
  ) {
    this.message = data.message;
    this.starshipChangedStatus = data.starshipChangedStatus;
  }

  // LES METHODES / FONCTIONS //

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      starshipStatus: new FormControl(''),
    });
  }

  changeStarshipStatus(): void {
    this.newStatus = this.form.get('starshipStatus')?.value;

    if (this.starshipChangedStatus.id) {
      this.starshipService
        .changeStarshipStatus(this.newStatus, this.starshipChangedStatus.id)
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
export class ChangestarshipstatusmodalModel {
  constructor(public message: string, public starshipChangedStatus: Starship) {}
}
