import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IProfile} from "../../../shared/services/account.service";
@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, MatFormField, ReactiveFormsModule, MatInput, MatButton, MatLabel, MatError],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
})
export class UserSettingsComponent {
  matData: IProfile = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<UserSettingsComponent>)
  private fb = inject(FormBuilder);
  profileForm: FormGroup;
  avatarUrl: string | ArrayBuffer | null = '';
  avatarData: File | null = null;
  constructor() {
    console.log(this.matData);
    this.profileForm = this.fb.group({
      username: [this.matData.username, Validators.required],
      email: [this.matData.email, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      avatar: [null]
    });
  }

  // onFileSelected(event: Event): void {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.avatarUrl = reader.result;
  //       this.profileForm.patchValue({ avatar: file });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  onFileSelected(event: Event): void {
    const inputNode = event.target as HTMLInputElement;
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result;
          this.profileForm.patchValue({ avatar: this.avatarUrl });
        console.log(e.target.result);
      };
      if (inputNode.files) {
      reader.readAsDataURL(inputNode.files[0]);
      this.avatarData = inputNode.files[0];
        console.log(this.avatarData);
      this.profileForm.patchValue({ avatar: this.avatarData });
      }
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }
  }

  handleErrorAvatar() {
    this.avatarUrl = './assets/images/default_avt.jpg';
  }
}
