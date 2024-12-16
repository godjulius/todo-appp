import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {BucketsService} from "../../shared/services/buckets.service";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {PagedListingComponent, PagedRequestDto} from "../../core/page-listing-base";
import {LoadingService} from "../../shared/app-loading/loading.service";
import {finalize} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {BucketsEditComponent} from "./buckets-edit/buckets-edit.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-buckets',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatIconButton, MatPaginatorModule, MatButtonModule,],
    templateUrl: './buckets.component.html',
    styleUrl: './buckets.component.scss',
})
export class BucketsComponent extends PagedListingComponent implements OnInit {
    bucketsService = inject(BucketsService)
    destroyRef = inject(DestroyRef)
    dialog = inject(MatDialog)
    router = inject(Router)
    route = inject(ActivatedRoute)
    paramObj = {
        limit: 10,
        page: 1,
        query: ''
    }
    buckets: any[] = [];
    constructor() {
        super()
        this.paramsChanged()
    }

    ngOnInit() {
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
        }).afterClosed().subscribe((isDelete) => {
            if (isDelete && this.totalItems % this.pageSize === 1) {
                this.pageNumber = this.pageNumber - 1
            }
            this.refresh()
        });
    }

    test(bucket: any) {
        this.router.navigate([bucket.id], { relativeTo: this.route });
    }

    openAddBucketDialog() {
        this.dialog.open(BucketsEditComponent).afterClosed().subscribe((isReload) => {
            if (isReload) {
                this.pageNumber = 1
                this.refresh()
            }
        });
    }

    pageChangedV2(page: PageEvent) {
        this.router.navigate([], {
            queryParams: {
                page: page.pageIndex + 1,
                limit: page.pageSize
            }
        })
        this.pageNumber = page.pageIndex + 1
        this.pageSize = page.pageSize
        this.refresh()
    }

    paramsChanged() {
        const paramSubs = this.route.queryParams.subscribe((params) => {
            if (params['page']) {
                this.pageNumber = params['page']
            }
            if (params['limit']) {
                this.pageSize = params['limit']
            }
        })
        this.destroyRef.onDestroy(() => {
            paramSubs.unsubscribe();
        })
    }
}
