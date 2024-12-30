import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-common-input',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './common-input.component.html',
    styleUrl: './common-input.component.scss',
})
export class CommonInputComponent {}
