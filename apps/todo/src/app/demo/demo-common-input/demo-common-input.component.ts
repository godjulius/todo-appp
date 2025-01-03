import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonInputComponent} from "../../shared/common-input/common-input.component";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {BucketsEditComponent} from "../../pages/buckets/buckets-edit/buckets-edit.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonButtonComponent} from "../../shared/common-button/common-button.component";
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
    selector: 'app-demo-common-input',
    standalone: true,
    imports: [CommonModule, CommonInputComponent, MatIcon, ReactiveFormsModule, FormsModule, CommonButtonComponent, MatFormFieldModule,
        MatSelectModule,],
    templateUrl: './demo-common-input.component.html',
    styleUrl: './demo-common-input.component.scss',
})
export class DemoCommonInputComponent {
    dialog = inject(MatDialog)
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
    });
    passwordType = 'password';
    postfix = '@gmail.com';
    formValue: any;
    openDialog() {
        this.dialog.open(BucketsEditComponent);
    }

    handleSubmit() {
        console.log(this.loginForm.value);
        this.formValue = this.loginForm.value;
    }

    handleInput(event: any) {
        console.log(event.target.value);
        this.postfix = event.target.value;
    }

    toggleVisbilityPass() {
        this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    }
}
