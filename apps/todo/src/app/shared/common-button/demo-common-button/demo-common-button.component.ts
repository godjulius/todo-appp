import {Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonButtonComponent} from "../common-button.component";
import {MatIcon} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-demo-common-button',
    standalone: true,
    imports: [CommonModule, CommonButtonComponent, MatIcon, MatSelectModule, FormsModule, MatFormFieldModule],
    templateUrl: './demo-common-button.component.html',
    styleUrl: './demo-common-button.component.scss',
})
export class DemoCommonButtonComponent {
    isLoading = false
    isDisplayLeftIcon = signal(true)
    isDisplayRightIcon = signal(true)
    variant = signal('primary')
    size = signal('md')
    isDisabled = signal(false)
    toggleLoadingBtn() {
        this.isLoading = !this.isLoading
    }
    testFn(event: MouseEvent) {
        event.stopPropagation()
        console.log('test')
    }

    toggleLeftIcon() {
        this.isDisplayLeftIcon.set(!this.isDisplayLeftIcon())
    }

    toggleRightIcon() {
        this.isDisplayRightIcon.set(!this.isDisplayRightIcon())
    }

    toggleDisable() {
        this.isDisabled.set(!this.isDisabled())
    }
}
