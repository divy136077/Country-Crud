import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-client-dialog',
  templateUrl: './add-new-client-dialog.component.html',
  styleUrls: ['./add-new-client-dialog.component.scss']
})
export class AddNewClientDialogComponent implements OnInit {
// Public properties
viewLoading: boolean;
assignProject: boolean;
createProject: boolean;

/**
 * Component constructor
 *
 * @param dialogRef: MatDialogRef<DeleteEntityDialogComponent>
 * @param data: any
 */
constructor(
  public dialogRef: MatDialogRef<AddNewClientDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) { }

 /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    if(this.data.page == 'Assign Project'){
      this.createProject = false;
      this.assignProject = true;
    }
    else if(this.data.page == 'Create Project'){
      this.assignProject = false;
      this.createProject = true;
    }
    else{
      this.assignProject = false ;
      this.createProject = false;
    }
  }

  /**
   * Close dialog with false result
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Close dialog with true result
   */
  onYesClick(): void {
    /* Server loading imitation. Remove this */
    this.viewLoading = true;
    setTimeout(() => {
      this.dialogRef.close(true); // Keep only this row
    }, 1000);
  }
}
