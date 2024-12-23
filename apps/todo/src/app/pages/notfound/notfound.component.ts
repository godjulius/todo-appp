import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

@Component({
    selector: 'app-notfound',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './notfound.component.html',
    styleUrl: './notfound.component.scss',
})
export class NotfoundComponent {}
