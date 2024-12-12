import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
    selector: 'app-buckets',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatIconButton, MatButton],
    templateUrl: './buckets.component.html',
    styleUrl: './buckets.component.scss',
})
export class BucketsComponent {}
