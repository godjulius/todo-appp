import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {CommonButtonComponent} from "../../shared/common-button/common-button.component";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
    selector: 'app-notfound',
    standalone: true,
    imports: [CommonModule, RouterModule, CommonButtonComponent, MatIcon, MatProgressSpinner],
    templateUrl: './notfound.component.html',
    styleUrl: './notfound.component.scss',
})
export class NotfoundComponent {
}
