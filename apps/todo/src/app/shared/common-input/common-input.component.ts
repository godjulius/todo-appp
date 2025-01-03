import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    input,
    OnChanges,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ControlValueAccessor, NgControl, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {ErrorsDirective} from "../directives/errors.directive";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
    selector: 'app-common-input',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatIconModule, ErrorsDirective, TranslatePipe],
    templateUrl: './common-input.component.html',
    styleUrl: './common-input.component.scss',
})
export class CommonInputComponent implements ControlValueAccessor, AfterViewInit, OnChanges {
    type = input<string>('email');
    placeholder = input<string>('');
    disabled = input<boolean>(false);
    postfix = input<string>('');
    for = input<string>('');
    labelName = input<string>('');
    required = input<boolean>(false);
    @Input() postfixRef: TemplateRef<any> | undefined;
    @ViewChild('input', { static: true }) inputRef: ElementRef | undefined;

    value = '';

    constructor(public ngControl: NgControl) {
        ngControl.valueAccessor = this;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['postfix'] && !changes['postfix'].firstChange) {
            const currentValue = this.value.replace(changes['postfix'].previousValue, '');
            if (this.inputRef) {
                this.inputRef.nativeElement.value = currentValue;
            }
            this.value = currentValue ? currentValue + changes['postfix'].currentValue : '';
            this.onChange(this.value);
            this.onChange(this.value);
            this.onTouch();
        }
    }

    ngAfterViewInit() {
        console.log(this.inputRef?.nativeElement.touched);
    }

    onChange: any = () => {};
    onTouch: any = () => {};

    // ControlValueAccessor methods

    writeValue(value: string): void {
        this.value = value;
        if (this.inputRef) {
            this.inputRef.nativeElement.value = value;
        }
    }

    registerOnChange(fn: never): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: never): void {
        this.onTouch = fn;
    }

    public get control() {
        return this.ngControl.control;
    }

    // Custom methods

    onFocusOut() {
        this.onTouch();
    }

    onInput(event: Event): void {
        if (event && event.target) {
        this.value = (event.target as HTMLInputElement).value + this.postfix();
        if ((event.target as HTMLInputElement).value === '') {
            this.value = '';
        }
        this.onChange(this.value);
        this.onTouch();
        }
    }

    clearValue() {
        if (this.inputRef) {

            this.inputRef.nativeElement.value = '';
        }
        this.value = '';
        this.onChange(this.value);
        this.onTouch();
    }
}
