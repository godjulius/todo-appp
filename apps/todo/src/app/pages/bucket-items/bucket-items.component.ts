import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseComponent} from "../../core/base.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";

@Component({
    selector: 'app-bucket-items',
    standalone: true,
    imports: [CommonModule, MatButton, MatFabButton, MatFormField, MatIcon, MatIconButton, MatInput, MatLabel, MatPaginator, MatSuffix],
    templateUrl: './bucket-items.component.html',
    styleUrl: './bucket-items.component.scss',
})
export class BucketItemsComponent extends BaseComponent{
    router = inject(Router)
    route = inject(ActivatedRoute)
    bucketId = signal(0)
    constructor() {
        super()
        this.route.params.subscribe(params => {
            console.log(params)
            this.bucketId.set(params['id'])
        })
    }
}
