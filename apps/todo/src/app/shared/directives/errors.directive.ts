import {DestroyRef, Directive, ElementRef, inject, input, OnChanges, SimpleChanges} from '@angular/core';
import {ValidationErrors} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Directive({
    selector: '[appInputErrors]',
    standalone: true,
})
export class ErrorsDirective implements OnChanges {
    elementRef = inject(ElementRef)
    translateService = inject(TranslateService)
    destroyRef = inject(DestroyRef)
    errors = input<ValidationErrors | null>([])
    fieldName = input<string>('')
    constructor() {
        //
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['errors']) {
            if (this.errors()) {
                console.log(this.errors())
                const errorKeys = Object.keys(this.errors() || {});
                switch (errorKeys[0]) {
                    case 'required':
                        // this.elementRef.nativeElement.innerText = this.translateService.instant('ERROR_Required', {fieldName: this.fieldName()})
                        this.translateService.get('ERROR_Required', {fieldName: this.fieldName()})
                            .pipe(
                                takeUntilDestroyed(this.destroyRef)
                            )
                            .subscribe((res) => {
                                this.elementRef.nativeElement.innerText = res
                            })
                        break;
                    case 'passwordMismatch':
                        this.elementRef.nativeElement.innerText = this.translateService.instant('ERROR_PasswordMismatch')
                        break;
                    default:
                        this.elementRef.nativeElement.innerText = errorKeys[0] + ' Error!'
                }
            }
        }
    }
}
