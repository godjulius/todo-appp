import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatListItem} from "@angular/material/list";
import {TranslatePipe} from "@ngx-translate/core";
import {PagedListingComponent, PagedRequestDto} from "../../core/page-listing-base";
import {BucketsService} from "../../shared/services/buckets.service";
import {finalize} from "rxjs";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDialog} from "@angular/material/dialog";
import {BucketItemsEditComponent} from "./bucket-items-edit/bucket-items-edit.component";
import {CommonSearchComponent} from "../../shared/common-search/common-search.component";

@Component({
    selector: 'app-bucket-items',
    standalone: true,
    imports: [CommonModule, MatButton, MatFabButton, MatFormField, MatIcon, MatIconButton, MatInput, MatLabel, MatPaginator, MatSuffix, MatTooltipModule, MatListItem, TranslatePipe, MatPaginatorModule, MatTabsModule, CommonSearchComponent],
    templateUrl: './bucket-items.component.html',
    styleUrl: './bucket-items.component.scss',
})
export class BucketItemsComponent extends PagedListingComponent implements OnInit {
    bucketsService = inject(BucketsService)
    dialog = inject(MatDialog)
    bucketId = signal(0)
    taskList = signal<any>([])
    indexTab = -2

    constructor() {
        super()
        this.route.params.subscribe(params => {
            this.bucketId.set(params['id'])
        })
        this.paramsChangedV2()
    }

    ngOnInit() {
        // no indexTab in the url
        if (this.indexTab < -1) {
            this.refresh()
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    protected override list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function) {
        this.paramObj.page = request.page || 1
        this.paramObj.limit = request.limit || this.pageSize
        this.loadingService.startLoading()
        const bucketsSubs = this.bucketsService.getBucketItems(this.bucketId(), this.paramObj)
            .pipe(
                finalize(() => {
                    this.loadingService.stopLoading()
                    finishedCallback()
                })
            )
            .subscribe((res: any) => {
                this.taskList.set(res.data)
                this.totalItems = res.total
                if (((request.page || 0) - 1) * (request.limit || 0) > res.total) {
                    this.router.navigate([], {
                        queryParams: {
                            page: 1,
                            limit: this.pageSize,
                            tab: this.indexTab
                        }
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

    handleTabChange(tabindex: number) {
        this.router.navigate([], {
            queryParams: {
                page: 1,
                limit: this.pageSize,
                tab: tabindex,
                query: this.paramObj.query
            }
        })
    }

    setTabParam(tabindex: string) {
        switch (tabindex) {
            case '1':
                this.paramObj.done = 1
                break;
            case '2':
                this.paramObj.done = 0
                break;
            default:
                this.paramObj.done = -2
        }
        this.refresh()
    }

    paramsChangedV2() {
        const paramSubs = this.route.queryParams.subscribe((params) => {
            if (params['page']) {
                this.pageNumber = params['page']
            }
            if (params['limit']) {
                this.pageSize = params['limit']
            }
            if (params['tab']) {
                this.indexTab = params['tab']
                if (!params['query']) {
                    this.paramObj.query = ''
                    this.setTabParam(params['tab'])
                } else {
                    this.paramObj.query = params['query']
                    this.setTabParam(params['tab'])
                }
            }
        })
        this.destroyRef.onDestroy(() => {
            paramSubs.unsubscribe();
        })
    }

    pageChangedV3(page: PageEvent) {
        this.router.navigate([], {
            queryParams: {
                page: page.pageIndex + 1,
                limit: page.pageSize,
                tab: this.indexTab,
                query: this.paramObj.query
            }
        })
        this.pageNumber = page.pageIndex + 1
        this.pageSize = page.pageSize
        // no require refresh because of paramsChangedV2 already handle it
        // this.refresh()
    }

    openEditBucketDialog(task: any) {
        this.dialog.open(BucketItemsEditComponent, {
            data: task
        }).afterClosed().subscribe((type) => {
            if (type === 'delete' && this.totalItems % this.pageSize === 1) {
                const totalPage = Math.floor((this.totalItems - 1) / this.pageSize)
                this.pageNumber = this.pageNumber - (this.pageNumber > totalPage ? 1 : 0)
                this.router.navigate([], {
                    relativeTo: this.route, queryParams: {
                        page: this.pageNumber,
                        limit: this.pageSize,
                        tab: this.indexTab,
                        query: this.paramObj.query
                    }
                }).then(() => {
                    this.refresh()
                })
            }
            if (type) {
                this.refresh()
            }
        });
    }

    openAddBucketItemDialog() {
        this.dialog.open(BucketItemsEditComponent, {
            data: {
                bucketId: this.bucketId(),
                isCreate: true
            }
        }).afterClosed().subscribe((isReload) => {
            if (isReload) {
                const totalPage = Math.floor((this.totalItems + 1) / this.pageSize) + ((this.totalItems + 1) % this.pageSize !== 0 ? 1 : 0)
                this.pageNumber = this.pageNumber < totalPage ? totalPage : this.pageNumber
                this.router.navigate([], {
                    relativeTo: this.route, queryParams: {
                        page: this.pageNumber,
                        limit: this.pageSize,
                        tab: this.indexTab,
                        query: this.paramObj.query
                    }
                }).then(() => {
                    this.refresh()
                })
            }
        });
    }

    handleSearchBucketItem(query: string) {
        this.paramObj.query = query
        this.handleSearch()
        this.router.navigate([], {
            queryParams: {
                page: 1,
                limit: this.pageSize,
                tab: this.indexTab,
                query: query
            }
        })
    }
}
