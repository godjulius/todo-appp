import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService, base64ToFile, IProfile} from "../../../shared/services/account.service";
import {Store} from "@ngrx/store";
import {updateProfile} from "../../../store/user.action";
import {BaseComponent} from "../../../core/base.component";
import {finalize} from "rxjs";
import { ToastMsgType } from '../../../shared/toast-msg/toast-msg.service';

@Component({
    selector: 'app-user-settings',
    standalone: true,
    imports: [CommonModule, MatFormField, ReactiveFormsModule, MatInput, MatButton, MatLabel, MatError],
    templateUrl: './user-settings.component.html',
    styleUrl: './user-settings.component.scss',
})
export class UserSettingsComponent extends BaseComponent implements OnInit {
    matData: IProfile = inject(MAT_DIALOG_DATA);
    dialogRef = inject(MatDialogRef<UserSettingsComponent>)
    accountService = inject(AccountService);
    private fb = inject(FormBuilder);
    store = inject(Store<{ profile: IProfile }>)
    profileForm: FormGroup;
    avatarUrl: string | undefined = '';
    avatarData: File | null = null;

    constructor() {
        super();
        this.profileForm = this.fb.group({
            username: [this.matData.username, Validators.required],
            email: [this.matData.email, [Validators.required, Validators.email]],
            // password: ['', Validators.required],
            avatar: [null]
        });
    }

    ngOnInit() {
        this.getAvatar();
    }

    onFileSelected(event: Event): void {
        this.profileForm.markAsDirty();
        const inputNode = event.target as HTMLInputElement;
        if (typeof (FileReader) !== 'undefined') {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                // display image after chossing it
                this.avatarUrl = e.target.result;
            };
            if (inputNode.files) {
                reader.readAsDataURL(inputNode.files[0]);
                this.avatarData = inputNode.files[0];
                this.profileForm.patchValue({avatar: this.avatarData});
            }
        }
    }

    onSubmit(): void {
        if (this.profileForm.valid) {
            const formData = new FormData();
            formData.append('username', this.profileForm.value.username);
            formData.append('email', this.profileForm.value.email);
            if (this.avatarData) {
                formData.append('avatar', this.avatarData);
            }
            this.loadingService.startLoading();
            const updateSubs = this.accountService.updateProfile(formData)
                .pipe(
                    finalize(() => {
                        this.loadingService.stopLoading();
                        this.toastMsgService.addSuccess({title: 'Success', message: 'Update profile successfully'});
                        this.dialogRef.close(true);
                    })
                )
                .subscribe((res) => {
                    this.store.dispatch(updateProfile({...this.matData, ...this.profileForm.value}));
            })

            this.destroyRef.onDestroy(() => {
                updateSubs.unsubscribe();
            })
        }
    }

    handleErrorAvatar() {
        // this.avatarUrl = './assets/images/default_avt.jpg';
    }

    getAvatar() {
        const avatarSubs = this.accountService.getAvatar().subscribe((blob: any) => {
            this.avatarUrl = blob
            this.avatarData = base64ToFile(blob, 'avatar');
        })
        this.destroyRef.onDestroy(() => {
            avatarSubs.unsubscribe();
        })
    }

}

