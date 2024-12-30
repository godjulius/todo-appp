import {Component, DestroyRef, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {TranslatePipe} from "@ngx-translate/core";
import {MatOption, MatSelect} from "@angular/material/select";
import {HttpClient} from "@angular/common/http";
import {CookieStorageService} from "../core/services/cookie-storage.service";
import {AUTH_TOKEN} from "../core/constant/AppConstant";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {LanguageSheetComponent} from "../pages/language-sheet/language-sheet.component";
import {BaseComponent} from "../core/base.component";
import {AccountService} from "../shared/services/account.service";
import {finalize} from "rxjs";
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {ToastMsgType} from "../shared/toast-msg/toast-msg.service";
import {ErrorsDirective} from "../shared/directives/errors.directive";

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule, MatInputModule, MatTabGroup, MatTab, TranslatePipe, MatSelect, FormsModule, MatOption, MatIcon, MatTooltip, ErrorsDirective],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
})
export class SignInComponent extends BaseComponent {
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });
    signupForm = new FormGroup({
        emailSignUp: new FormControl('', [Validators.required, Validators.email]),
        //todo: Add password and confirmPassword validation
        passwordSignUp: new FormControl('', [Validators.required]),
        confirmPasswordSignUp: new FormControl('', [Validators.required]),
    }, {
        validators: passwordMatchValidator()
    })
    httpClient = inject(HttpClient);
    cookieService = inject(CookieStorageService)
    router = inject(Router);
    private bottomSheet = inject(MatBottomSheet)
    private accountService = inject(AccountService);

    constructor() {
        super();
    }

    signIn() {
        if (this.loginForm.invalid) {
            return;
        }
        const username = this.loginForm.get('email')?.value;
        const password = this.loginForm.get('password')?.value;
        this.loadingService.startLoading()
        this.signInSubs(username || '', password || '');
    }

    signInSubs(username: string, password: string) {
        const signInSubscription = this.accountService.signIn({email: username || '', password: password || ''})
            .pipe(
                finalize(() => {
                    this.loadingService.stopLoading();
                })
            )
            .subscribe((response: unknown) => {
                if (response) {
                    this.cookieService.setCookie(AUTH_TOKEN, (response as ISignInResponse).access_token, 1);
                    this.router.navigate(['/main']);
                }
            });
        this.destroyRef.onDestroy(() => {
            signInSubscription.unsubscribe();
        })
    }

    signUp() {
        if (this.signupForm.invalid) {
            return;
        }
        const username = this.signupForm.get('emailSignUp')?.value;
        const password = this.signupForm.get('passwordSignUp')?.value;
        this.loadingService.startLoading()
        const signupSubscription = this.accountService.signUp({
            email: username || '',
            password: password || '',
            username: username || ''
        })
            .pipe(
                finalize(() => {
                    this.loadingService.stopLoading()
                })
            )
            .subscribe((response: unknown) => {
                if (response) {
                    this.toastMsgService.addSuccess({
                        title: 'Sign up success',
                        message: 'You have successfully signed up with email: ' + username
                    });
                    this.signInSubs(username || '', password || '');
                }
            })
        this.destroyRef.onDestroy(() => {
            signupSubscription.unsubscribe();
        })
    }

    openLanguageSheet() {
        this.bottomSheet.open(LanguageSheetComponent);

    }
}

interface ISignInResponse {
    access_token: string;
}

export function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('passwordSignUp')?.value;
        const confirmPassword = control.get('confirmPasswordSignUp')?.value;
        if (password === confirmPassword || confirmPassword === '') {
            return null
        } else {
            control.get('confirmPasswordSignUp')?.setErrors({passwordMismatch: true});
            return {passwordMismatch: true};
        }
    };
}
