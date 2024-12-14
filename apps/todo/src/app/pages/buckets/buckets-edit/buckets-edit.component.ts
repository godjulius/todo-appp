import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {IProfile} from "../../../shared/services/account.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-buckets-edit',
    standalone: true,
    imports: [CommonModule, MatSlideToggleModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
    templateUrl: './buckets-edit.component.html',
    styleUrl: './buckets-edit.component.scss',
})
export class BucketsEditComponent {
    isPublic = false;
    title = '';
    matData = inject(MAT_DIALOG_DATA);
    constructor() {
        console.log(this.matData);
        this.isPublic = this.matData.public;
        this.title = this.matData.title;
    }

}
