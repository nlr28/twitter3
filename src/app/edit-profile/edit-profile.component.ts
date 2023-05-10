import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../share/model/user";

declare let window: any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;
  public image: any = null;



  public constructor(
      public dialogRef: MatDialogRef<EditProfileComponent>,
      @Inject(MAT_DIALOG_DATA) public data: User,
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public onFileSelected(event: any) {

    this.image = event.target.files[0];
    if(this.image != null) {
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(this.image);
      reader.onloadend = () => {
        window.Buffer = require('buffer/').Buffer;
        this.data.avatarBuffer = window.Buffer(reader.result);
      }
    }

  }
}
