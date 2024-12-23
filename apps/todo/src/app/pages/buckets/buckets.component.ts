import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {BucketsService} from "../../shared/services/buckets.service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PagedListingComponent, PagedRequestDto} from "../../core/page-listing-base";
import {finalize} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {BucketsEditComponent} from "./buckets-edit/buckets-edit.component";
import {CommonSearchComponent} from "../../shared/common-search/common-search.component";

@Component({
    selector: 'app-buckets',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatIconButton, MatPaginatorModule, MatButtonModule, CommonSearchComponent],
    templateUrl: './buckets.component.html',
    styleUrl: './buckets.component.scss',
})
export class BucketsComponent extends PagedListingComponent implements OnInit {
    bucketsService = inject(BucketsService)
    dialog = inject(MatDialog)
    // buckets: any[] = [];
    buckets = signal<any[]>([])

    constructor() {
        super()
        this.paramsChanged()
    }

    ngOnInit() {
        this.refresh()
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type,@typescript-eslint/no-unused-vars
    list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function) {
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
                this.buckets.set(res.data)
                this.totalItems = res.total
                if (request.page && request.limit && (request.page - 1) * (request.limit) > res.total) {
                    this.router.navigate([], {
                        queryParams: {
                            page: 1,
                            limit: this.pageSize,
                        }
                    }).then(() => {
                        this.refresh()
                    })
                }
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
        }).afterClosed().subscribe((type) => {
            if (type === 'delete' && this.totalItems % this.pageSize === 1) {
                const totalPage = (this.totalItems - 1) / this.pageSize
                this.pageNumber = this.pageNumber - (this.pageNumber > totalPage ? 1 : 0)
                this.router.navigate([], {
                    relativeTo: this.route, queryParams: {
                        page: this.pageNumber,
                        limit: this.pageSize,
                        query: this.paramObj.query
                    }
                });
            }
            if (type) {
                this.refresh()
            }
        });
    }

    openBucketTasks(bucket: any) {
        this.router.navigate([bucket.id], {
            relativeTo: this.route, queryParams: {
                page: 1,
                tab: 2
            }
        });
    }

    openAddBucketDialog() {
        this.dialog.open(BucketsEditComponent).afterClosed().subscribe((isReload) => {
            if (isReload) {
                this.pageNumber = 1
                this.router.navigate([], {
                    queryParams: {
                        page: 1,
                        limit: this.pageSize,
                        query: ''
                }}).then(() => {
                    this.refresh()
                })
            }
        });
    }

    handleSearchBucket(query: string) {
        this.paramObj.query = query
        this.handleSearch()
        this.router.navigate([], {
            queryParams: {
                page: 1,
                limit: this.pageSize,
                query: query
            }
        })
    }
}
