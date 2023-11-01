import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  title: string;
  message: string;

  constructor() { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(m?: string): void {
    this.dialogRef.close(false);
  }
}
export class DialogConfirmModel {
  constructor(public title: string, public message: string) {}
}

}
