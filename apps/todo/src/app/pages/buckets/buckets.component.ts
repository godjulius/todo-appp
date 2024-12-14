import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {AccountService} from "../../shared/services/buckets.service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PagedListingComponent, PagedRequestDto} from "../../core/page-listing-base";
import {LoadingService} from "../../shared/app-loading/loading.service";
import {finalize} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {BucketsEditComponent} from "./buckets-edit/buckets-edit.component";

@Component({
    selector: 'app-buckets',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatIconButton, MatPaginatorModule, MatButtonModule,],
    templateUrl: './buckets.component.html',
    styleUrl: './buckets.component.scss',
})
export class BucketsComponent extends PagedListingComponent implements OnInit {
    loadingService = inject(LoadingService)
    bucketsService = inject(AccountService)
    destroyRef = inject(DestroyRef)
    dialog = inject(MatDialog)
    paramObj = {
        limit: 10,
        page: 1,
        query: ''
    }
    buckets: any[] = [];
    constructor() {
        super()
    }

    ngOnInit() {
        console.log(1)
        this.refresh()
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type,@typescript-eslint/no-unused-vars
    list(request: PagedRequestDto, pageNumber: number,  finishedCallback: Function) {
        this.paramObj.page = request.page || 1
        this.paramObj.limit = request.limit || this.pageSize
        this.loadingService.startLoading()
        const bucketsSubs = this.bucketsService.getBuckets(this.paramObj)
            .pipe(
                finalize(() => {
                    this.loadingService.stopLoading()
                    finishedCallback()
                })
            )
            .subscribe((res: any) => {
            console.log(res);
            this.buckets = res.data
            this.totalItems = res.total
        })
        this.destroyRef.onDestroy(() => {
            bucketsSubs.unsubscribe();
        })
    }

    protected override delete(entity: any) {
        throw new Error('Method not implemented.');
    }

    openEditBucketDialog(bucket: any) {
        this.dialog.open(BucketsEditComponent, {
            data: bucket
        });
    }
}
