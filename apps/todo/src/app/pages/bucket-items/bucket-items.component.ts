import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseComponent} from "../../core/base.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatListItem} from "@angular/material/list";
import {TranslatePipe} from "@ngx-translate/core";
import {PagedListingComponent, PagedRequestDto} from "../../core/page-listing-base";

@Component({
    selector: 'app-bucket-items',
    standalone: true,
    imports: [CommonModule, MatButton, MatFabButton, MatFormField, MatIcon, MatIconButton, MatInput, MatLabel, MatPaginator, MatSuffix, MatTooltipModule, MatListItem, TranslatePipe, MatPaginatorModule],
    templateUrl: './bucket-items.component.html',
    styleUrl: './bucket-items.component.scss',
})
export class BucketItemsComponent extends PagedListingComponent {
    router = inject(Router)
    route = inject(ActivatedRoute)
    bucketId = signal(0)
    taskList = signal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])

    constructor() {
        super()
        this.route.params.subscribe(params => {
            console.log(params)
            this.bucketId.set(params['id'])
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    protected override list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function) {
        throw new Error('Method not implemented.');
    }

    protected override delete(entity: any) {
        throw new Error('Method not implemented.');
    }
}
