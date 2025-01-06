import {
    AfterContentInit,
    Component,
    ContentChild,
    input
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[appCommonButton]',
    standalone: true,
    imports: [CommonModule, MatProgressSpinner],
    templateUrl: './common-button.component.html',
    host: {
        class: 'd-flex justify-content-center align-items-center gap-2px btn',
        '[class.common-button--loading]': 'isLoading()',
        '[class.btn-primary]': 'variant() === variantsMaps["primary"]',
        '[class.btn-secondary]': 'variant() === variantsMaps["secondary"]',
        '[class.btn-outline-primary]': 'variant() === variantsMaps["outline"]',
        '[class.btn-link]': 'variant() === variantsMaps["link"]',
        '[class.btn-sm]': 'size() === sizesMaps["sm"]',
        '[class.btn-lg]': 'size() === sizesMaps["lg"]',
    },

})
export class CommonButtonComponent implements AfterContentInit {

    @ContentChild('prefixIcon') prefixIcon: any
    @ContentChild('postfixIcon') postfixIcon: any
    isLoading = input(false)
    variant = input<('primary' | 'secondary' | 'outline' | 'link' | string)>('primary')
    size = input('md')
    constructor() {
        //
    }

    ngAfterContentInit() {
        if (this.prefixIcon) {
            console.log(this.prefixIcon)
        }

    }

    protected readonly variantsMaps = variantsMaps;
    protected readonly sizesMaps = sizesMaps;
}


const variantsMaps = {
    'primary': 'primary',
    'secondary': 'secondary',
    'outline': 'outline',
    'link': 'link',
} as const

const sizesMaps = {
    'sm': 'sm',
    'md': 'md',
    'lg': 'lg',
    'xl': 'xl'
}
