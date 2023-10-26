import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
  ) {}

  ngOnInit(): void {
    this.dialogRef.updateSize('20%', '15%');
  }

  confirmAction(): void {
    this.dialogRef.close(true);
  }

  closeAction(): void {
    this.dialogRef.close(false); 
  }
}
