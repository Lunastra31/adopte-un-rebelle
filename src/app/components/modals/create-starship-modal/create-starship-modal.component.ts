import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StarshipService } from '../../../services/starship.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StarshipType } from '../../../models/enums/starship-type';

@Component({
  selector: 'app-create-starship-modal',
  templateUrl: './create-starship-modal.component.html',
  styleUrls: ['./create-starship-modal.component.scss'],
})
export class CreateStarshipModalComponent implements OnInit {
  public form!: FormGroup;
  protected starshipTypes: any[] = Object.values(StarshipType).filter(
    (value) => typeof value !== 'number'
  );
  public newStarship!: any;
  public message!: string;

  constructor(
    private snackBar: MatSnackBar,
    private starshipServcie: StarshipService,
    public dialogRef: MatDialogRef<CreateStarshipModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateStarshipModalModel
  ) {
    this.message = data.message;
  }

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      name: new FormControl('', Validators.required),
      starshipType: new FormControl('', Validators.required),
    });
  }

  handleAddStarship(): void {
    this.newStarship = {
      id: null,
      name: this.form.get('name')?.value,
      starshipType: this.form.get('starshipType')?.value,
      starshipStatus: 'DISPONIBLE',
      pilot: null,
    };
    console.log(this);

    this.starshipServcie.createStarship(this.newStarship).subscribe({
      next: (res) => {
        this.snackBar.open(res.name + 'a bien été créer', '', {
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
export class CreateStarshipModalModel {
  constructor(public message: string) {}
}
