// Angular
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-status-dialog',
  templateUrl: './update-status-dialog.component.html',
  styleUrls: ['./update-status-dialog.component.scss']
})
export class UpdateStatusDialogComponent implements OnInit {

  selectedStatusForUpdate = new FormControl('');
  viewLoading: boolean;
  loadingAfterSubmit: boolean;
  constructor(
    public dialogRef: MatDialogRef<UpdateStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateStatus() {
    if (this.selectedStatusForUpdate.value.length === 0) {
      return;
    }

    /* Server loading imitation. Remove this */
    this.viewLoading = true;
    this.loadingAfterSubmit = true;
    setTimeout(() => {
      this.dialogRef.close(this.selectedStatusForUpdate.value); // Keep only this row
    }, 1000);
  }
}
